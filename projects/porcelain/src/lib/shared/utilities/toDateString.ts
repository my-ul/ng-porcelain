import moment from 'moment';

export const toDateString = (date: Date | moment.Moment, format: 'YYYY-MM-DD') =>
	moment(date).format(format);
