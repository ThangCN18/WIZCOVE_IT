import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  async create(userId: string, courseId: string) {
    const data = { courseId, userId };
    const cart = await this.cartRepo.findOne({ courseId, userId });
    if (cart) {
      return cart;
    }
    return this.cartRepo.save(data);
  }

  getCartOfUser(userId: string) {
    return this.cartRepo.find({ where: { userId }, relations: ['course'] });
  }

  remove(userId: string, courseId: string) {
    return this.cartRepo.delete({ userId, courseId });
  }
}
