import * as moment from 'moment';

export function isExpired(timestamp: number | Date) {
  return moment().unix() > timestamp;
}
