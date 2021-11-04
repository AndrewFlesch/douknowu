function getDuration(startDate, endDate) {
  let now = new Date();
  if (endDate) {
    console.log('Have end date');
    console.log(endDate);
    now = new Date(endDate);
  }
  let start = new Date(startDate);
  let seconds = Math.floor((now - (start))/1000);
  let minutes = Math.floor(seconds/60);
  if (endDate) {
    console.log(minutes);
    return minutes;
  }
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

  let dayString = '';
  let hourString = '';
  let minuteString = minutes + 'm';
if (days >= 1) { dayString = days + 'd:' };
if (days >= 1 || hours >= 1) {hourString = hours + 'h:' };
let duration = dayString + hourString + minuteString;
return duration;
};

export default getDuration;
