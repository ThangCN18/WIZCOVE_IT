import { isNumber } from 'lodash';
import { ValueTransformer } from 'typeorm';

export class TimestampTransformer implements ValueTransformer {
  to(value: any) {
    return isNumber(value) ? new Date(value * 1000) : value;
  }

  from(value: any) {
    return value ? Math.round(+new Date(value) / 1000) : value;
  }
}
