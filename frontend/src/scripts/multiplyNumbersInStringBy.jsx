/*
  Take a String and multiply any numbers in it, including floats and fractions, by a given number.
  Used by Recipe page to multiply ingredient quantities for different numbers of portions.
*/

import { toDecimal } from "vulgar-fractions";

export const multiplyNumbersInStringBy = (string, multiplyBy) => {
  //boolean storing whether start / end of a number has been found
  let hasFoundNumerStart = false;
  let hasFoundNumberEnd = false;
  // integer storing start and end points of found number
  let numberStartIndex;
  let numberEndIndex;
  // string with value "float" / "fraction" / "unclear"
  let foundNumberType;

  const replaceWithAtPostition = (replaceWith, start, end) => {
    return (
      string.substring(0, start) +
      replaceWith +
      string.substring(end, string.length)
    );
  };

  const whenDigitFound = () => {
    // extract the number ending at the found index
    // match digits as well as the chars . , / in the same line
    let number = String(
      /[\d\.,\/]+$/s.exec(string.substring(0, numberEndIndex))
    );
    // save start index of number for reference later
    numberStartIndex = numberEndIndex - number.length;
    //remove any leading slashes, as there should be a number before a slash in a fraction
    number = number.replace(/^[\/]+/, "");
    // get number of chars in number which are not digits
    const nonDigitCharsAmount = (number.match(/\.,\//g) || []).length;
    //if there is more than one non digit, number is neither recognized as a floating point number nor fraction
    if (nonDigitCharsAmount > 1) return;

    // convert the stringified number to a float number
    const slashesAmount = (number.match(/\//g) || []).length;
    if (slashesAmount === 1) {
      // if number is a fraction, convert to float
      const fractionParts = number.split("/");
      number = Number(fractionParts[0]) / Number(fractionParts[1]);
    } else {
      // if number is float, replace comma with period and convert to number
      number = Number(number.replace(",", "."));
    }

    // multiply number
    number = number * multiplyBy;

    // round to third significant digit
    number = Number(number.toPrecision(3));

    //replace number in text
    string = replaceWithAtPostition(number, numberStartIndex, numberEndIndex);
  };

  // let charToDecimal;
  let charAtIndex;
  for (let index = string.length - 1; index >= 0; index--) {
    // go through string from end to start until a digit has been found
    charAtIndex = string.charAt(index);

    // see if current char is a unicode fraction by trying to convert it and comparing it to original
    const charToDecimal = String(toDecimal(charAtIndex)); // convert any unicode fraction chars with their decimal representations, e.g.: ⅓ => 0.3333333333333333
    if (charAtIndex !== charToDecimal) {
      string = replaceWithAtPostition(charToDecimal, index, index+1);
      index += charToDecimal.length-1;
    }
    if (/[0-9]/.test(charAtIndex)) {
      // if char at index is a digit
      numberEndIndex = index + 1; // set end of found number to index
      whenDigitFound();
      index = numberStartIndex; //skip chars where there can't be a (new) number
    }
  }

  return string;
};
