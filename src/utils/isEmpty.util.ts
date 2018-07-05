export const isEmpty = (val: any): boolean => {
  if (val === undefined
      || val === "undefined"
      || val === ""
      || val === null) {
      if (val instanceof Array) {
          return val.length > 0 ? true : false;
      }
      return true;
  }
  return false;
};