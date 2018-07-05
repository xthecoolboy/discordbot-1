import { IUser } from "../domains";

export const getUserString = (user: IUser): string => {
  return `<@${user.id}>`;
};