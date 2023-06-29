import { Injectable } from '@nestjs/common';
import { CourseService } from '../../courses/services/course.service';
import { In } from 'typeorm';
import Stripe from 'stripe';
import { env } from '../../config/env.config';
import { UserEntity } from '../../users/entities/user.entity';
import { CheckoutInfoDto } from '../dto/checkout-info.dto';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentStatus } from '../enums/payment-status';
import { PaymentDetailRepository } from '../repositories/payment-detail.repository';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';
import { CourseSubscribeService } from '../../courses/services/course-subscribe.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private paymentRepo: PaymentRepository,
    private courseService: CourseService,
    private paymentDetailRepo: PaymentDetailRepository,
    private courseSubscribeService: CourseSubscribeService,
  ) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  getPaymentOfUser(userId: string) {
    return this.paymentRepo.find({
      where: { userId },
      relations: ['paymentDetails', 'paymentDetails.course'],
    });
  }

  async checkoutInfo(user: UserEntity, body: CheckoutInfoDto) {
    const courses = await this.courseService.findAll({
      where: { id: In(body.courseIds) },
    });
    const listItems = courses.map(
      ({ name, price, discount, headline, image }) => ({
        price_data: {
          currency: 'USD',
          product_data: {
            name,
            description: headline,
            images: [image],
          },
          unit_amount: discount ? discount * 100 : price * 100,
        },
        quantity: 1,
      }),
    );
    const section = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${env.WEB_URL}/payment?success=1`,
      cancel_url: `${env.WEB_URL}/courses`,
      customer_email: user.email,
      mode: 'payment',
      line_items: listItems,
      metadata: {
        courseIds: JSON.stringify(courses.map(({ id }) => id)),
        userId: user.id,
      },
      locale: 'en',
    });
    return { url: section.url };
  }

  async handleWebhook(event: any) {
    const session = await this.stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );
    const data = {
      userId: session.metadata.userId,
      email: session.customer_email,
      totalPrice: session.amount_total / 100,
      totalCourses: JSON.parse(session.metadata.courseIds).length,
    };
    let payment = await this.paymentRepo.save(data);
    switch (event.type) {
      case 'checkout.session.completed':
        const payDetailsData = JSON.parse(session.metadata.courseIds).map(
          (courseId) => ({
            courseId,
            paymentId: payment.id,
          }),
        );
        await this.paymentDetailRepo.save(payDetailsData);

        await Promise.all(
          JSON.parse(session.metadata.courseIds).map((courseId) =>
            this.courseSubscribeService.createOne(
              session.metadata.userId,
              courseId,
            ),
          ),
        );
        await this.paymentRepo.update(
          { id: payment.id },
          { status: PaymentStatus.SUCCEEDED },
        );

        break;
      case 'checkout.session.payment_failed':
        payment.status = PaymentStatus.FAILED;
        await this.paymentRepo.update(
          { id: payment.id },
          { status: PaymentStatus.FAILED },
        );
        break;
      default:
        break;
    }
  }

  getAll(query: QueryParamsFilterDto) {
    return this.paymentRepo.filter(query);
  }
}
