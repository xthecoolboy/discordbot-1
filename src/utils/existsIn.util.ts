import { isEmpty } from "./isEmpty.util";

export const existsIn = ( needle: any, haystack: any[]): boolean => {
  if (!isEmpty(haystack)) {
    return haystack.findIndex( (i) => i === needle ) > -1;
  }
  return false;
};