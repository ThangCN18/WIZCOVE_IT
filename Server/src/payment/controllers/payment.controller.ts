import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CurrentUser } from '../../users/decorators/user-current.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { Auth } from '../../users/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CheckoutInfoDto } from '../dto/checkout-info.dto';
import { Roles } from '../../users/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/roles.enum';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @Auth()
  @Roles(RoleEnum.ADMIN, RoleEnum.INSTRUCTOR)
  getAll(@Query() query: QueryParamsFilterDto) {
    return this.paymentService.getAll(query);
  }

  @Post('checkout-info')
  @Auth()
  checkoutInfo(@CurrentUser() user: UserEntity, @Body() body: CheckoutInfoDto) {
    return this.paymentService.checkoutInfo(user, body);
  }

  @Post('webhook')
  handeWebhook(@Body() body: any) {
    console.log(body);
    return this.paymentService.handleWebhook(body);
  }
}
