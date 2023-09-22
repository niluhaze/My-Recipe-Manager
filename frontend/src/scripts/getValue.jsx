/* 
  Used to set default values in forms.
  If data for specific field is available, return the value for that field.
  Else choose the specified default value
*/

// for standard inputs like text fields:
export const getValue = ({data, key, defaultValue = null}) => {
  if (data[key] != undefined) {
    return data[key];
  }
  return defaultValue;
};

// for tag checkboxes:
export const getValueTags = ({
  tagArray,
  tag,
  defaultValue = false,
  useDefault = false
}) => {
  // return default value if tagArray is undefined or useDefault is set true
  if (tagArray === undefined || useDefault === true) return defaultValue;
  // else return true/false depending on inclusion of tag in tagArray
  return tagArray.includes(tag);
};
