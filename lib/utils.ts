import moment from 'moment';

export const capitalize = (s: string | string[]) => (s && s[0].toUpperCase() + s.slice(1)) || "";

export const daysAfterNewYears2018 = (date: number) => {
    return moment('2018-01-01').add(date, 'days').format('ll');
};
