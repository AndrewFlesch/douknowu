import { format, intervalToDuration, differenceInMinutes, parseISO, addMinutes} from 'date-fns';

export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
}

export const removeSeconds = (date) => {
  let fullDate = date;
  fullDate.setSeconds(0,0);
  return fullDate;
}

export const formatDateTime = (date) => {
  return format(new Date(date),"yyyy-MM-dd'T'HH:mm'")
}

export const formatDateTimeAll = (date) => {
  return format(new Date(date),"MM/dd/yy 'at' p")
}

export const returnFormatDateTime = (date) => {
  return new Date(date).toISOString();
}

export const durationFNS = (start, form, end) => {
  let endDate = new Date();
  if (end) {endDate = new Date(end)};
  let duration =  intervalToDuration({
    start: new Date(start),
    end: new Date(endDate)
  })

  let days = duration.days;
  let hours = duration.hours;
  let minutes = duration.minutes;

  if (form) {
    let durationArray = [days, hours, minutes];
    return durationArray;
  }

  let dayString = '';
  let hourString = '';
  let minuteString = minutes + 'm';
if (days >= 1) { dayString = days + 'd:' };
if (days >= 1 || hours >= 1) {hourString = hours + 'h:' };
let durationString = dayString + hourString + minuteString;
return durationString;
}

export const duraionMinutes = (startDate, endDate) => {
  console.log(endDate);
  let start = parseISO(startDate);
  let end = '';
  if (endDate) {
    end = parseISO(endDate);
    console.log(end);
  } else {
    end = new Date();
  }
  let durMin = differenceInMinutes(end, start);
  console.log(durMin);
  return durMin;
}

export const setEndDate = (start, minutes) => {
  let endDate = addMinutes(new Date(start), minutes);
  let formatEnd = format(new Date(endDate),"yyyy-MM-dd'T'HH:mm'")
  return formatEnd;
}
