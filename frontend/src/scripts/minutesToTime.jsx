// database stores time in minutes, this converts it to hours and minutes
export const minutesToTime = (minutes) => {
  //add leading zeroes to a number to make it 2 digits or more
  const addLeadingZeroes = (number) => {
    number = String(number);
    //if number's length is less than 2 add leading zeros to make it 2 digits, else leave as is
    return (number.length < 2) ? ('00' + number).slice(-2) : number;
  };
  const newMinutes = minutes % 60;
  const newHours = (minutes - newMinutes) / 60;
  return `${addLeadingZeroes(newHours)}:${addLeadingZeroes(newMinutes)}`;
};