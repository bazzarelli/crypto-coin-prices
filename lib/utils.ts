import moment from "moment";

export const capitalize = (s: string | string[]) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

export const daysAfterNewYears2019 = (date: number) => {
  return moment("2019-01-01").add(date, "days").format("ll");
};

export const tickLabelDaysAfterAYearAgo = (date: number) => {
  return moment(new Date())
    .subtract(1, "years")
    .add(date, "days")
    .format("MMM YYYY");
};

export const newYears2019 = () => {
  return moment("2019-01-01").format("X");
};

export const oneYearAgoFromNow = () => {
  return moment(new Date()).subtract(1, "years").format("X");
};

export const today = () => {
  return moment().startOf("day").format("X");
};
