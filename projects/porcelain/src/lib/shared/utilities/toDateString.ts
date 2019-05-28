import * as _moment from 'moment';
const moment = _moment;

export const toDateString = (date: Date | _moment.Moment, format: 'YYYY-MM-DD') =>
	moment(date).format(format);
