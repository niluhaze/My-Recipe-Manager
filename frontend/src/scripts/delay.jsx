/* 
  Delay code execution by given number of miliseconds
*/

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));