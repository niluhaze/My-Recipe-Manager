/* 
  Outputs the default values for the active/total time fields on the edit page.
*/

import { getValue } from "./getValue";
import { minutesToHoursMinutes } from "./time";

export const getValueHoursMinutes = (data, isEditExisting) => {
  // if editing existing, return empty json, leaving entries undefined
  if (!isEditExisting) return {};

  // get minute and hour data in json form
  const cookTimeActive = minutesToHoursMinutes(
    getValue({
      data: data,
      key: "cookTimeActive",
    })
  );
  const cookTimeTotal = minutesToHoursMinutes(
    getValue({
      data: data,
      key: "cookTimeTotal",
    })
  );

  return {
    activeHours: cookTimeActive.hours,
    activeMinutes: cookTimeActive.minutes,
    totalHours: cookTimeTotal.hours,
    totalMinutes: cookTimeTotal.minutes,
  };
};
