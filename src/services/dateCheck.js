const timeGap = (date) => {
  let currentDate = new Date();
  let previousDate = new Date(date);

  let difference = Math.abs(currentDate - previousDate) / 1000;
  let time_units = {};
  let seconds_rate = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  Object.keys(seconds_rate).forEach(function (key) {
    time_units[key] = Math.floor(difference / seconds_rate[key]);
    difference -= time_units[key] * seconds_rate[key];
  });
  let { year, month, week, day, hour, minute, second } = time_units;

  if (year > 0) return timeGapStatement(year, "yr");
  if (month > 0) return timeGapStatement(month, "mo");
  if (week > 0) return timeGapStatement(week, "wk");
  if (day > 0) return timeGapStatement(day, "d");
  if (hour > 0) return timeGapStatement(hour, "hr");
  if (minute > 0) return timeGapStatement(minute, "min");
  if (second > 0) return timeGapStatement(second, "sec");

  return "Just now";
};

const timeGapStatement = (gap, measure) => {
  if (gap > 1) return `${Math.abs(parseInt(gap))}${measure}s`;
  return `${Math.abs(parseInt(gap))}${measure}`;
};

export default timeGap;
