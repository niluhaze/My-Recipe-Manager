// database stores time in minutes, this converts it to { hours, minutes }
export const minutesToHoursMinutes = (minutesIn) => {
  let minutes = minutesIn % 60;
  let hours = (minutesIn - minutes) / 60;
  return { hours, minutes };
};

// database stores time in minutes, this converts it to "hours:minutes"
export const minutesToTime = (minutesIn) => {
  //add leading zeroes to a number to make it 2 digits or more
  const addLeadingZeroes = (number) => {
    number = String(number);
    //if number's length is less than 2 add leading zeros to make it 2 digits, else leave as is
    return number.length < 2 ? ("00" + number).slice(-2) : number;
  };
  const { hours, minutes } = minutesToHoursMinutes(minutesIn);
  return `${addLeadingZeroes(hours)}:${addLeadingZeroes(minutes)}`;
};
