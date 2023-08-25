const timeGap = (date) => {
  let currentDate = new Date();
  let previousDate = new Date(date);
  if (currentDate.getFullYear() !== previousDate.getFullYear())
    return timeGapStatement(
      currentDate.getFullYear() - previousDate.getFullYear(),
      "yr"
    );
  if (currentDate.getMonth() !== previousDate.getMonth())
    return timeGapStatement(
      currentDate.getMonth() - previousDate.getMonth(),
      "mo"
    );
  if (currentDate.getDay() !== previousDate.getDay())
    return timeGapStatement(currentDate.getDay() - previousDate.getDay(), "d");
  if (currentDate.getHours() !== previousDate.getHours())
    return timeGapStatement(
      currentDate.getHours() - previousDate.getHours(),
      "hr"
    );
  if (currentDate.getMinutes() !== previousDate.getMinutes())
    return timeGapStatement(
      currentDate.getMinutes() - previousDate.getMinutes(),
      "min"
    );
  if (currentDate.getSeconds() !== previousDate.getSeconds())
    return timeGapStatement(
      currentDate.getSeconds() - previousDate.getSeconds(),
      "sec"
    );

  return "Just now";
};

const timeGapStatement = (gap, measure) => {
  if (gap > 1) return `${gap}${measure}s`;
  return `${gap}${measure}`;
};

export default timeGap;
