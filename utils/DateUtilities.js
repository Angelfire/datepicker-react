export function pad(value, length) {
  while (value.length < length) {
    return value = `0${value}`;
  }

  return value;
}

export function clone(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export function toString(date) {
  const fullYear = date.getFullYear();
  const fullMonth = pad((date.getMonth()+1).toString(), 2);
  const fullDay = pad(date.getDate().toString(), 2);
  
  return  `${fullYear}-${fullMonth}-${fullDay}`; 
}

export function toDayOfMonthString(date) {
  return pad(date.getDate().toString());
}

export function toMonthAndYearString(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()] + ' ' + date.getFullYear();
}

export function moveToDayOfWeek(date, dayOfWeek) {
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() - 1);
  }

  return date;
}

export function isSameDay(first, second) {
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
}

export function isBefore(first, second) {
  return first.getTime() < second.getTime();
}

export function isAfter(first, second) {
  return first.getTime() > second.getTime();
}
