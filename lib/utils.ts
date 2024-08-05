import moment from "moment";

export const capitalize = (s: string | string[]) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

export const tickLabelDaysAfterAYearAgo = (date: number) => {
  return moment(new Date())
    .subtract(1, "years")
    .add(date, "days")
    .format("MMM YYYY");
};

export const oneYearAgoFromNow = () => {
  return moment(new Date()).subtract(1, "years").format("X");
};

export const today = () => {
  return moment().startOf("day").format("X");
};

export const todayToISOString = () => {
  return moment().startOf("day").toISOString();
};
