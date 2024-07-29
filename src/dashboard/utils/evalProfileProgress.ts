import { UserProfile } from "profile/types/profile";
import { hasChars } from "./hasChars";

export const evalProfileProgress = (data: UserProfile | null | undefined): number => {
  if (!data) return 0;

  const totalFields = 9; // Total number of fields in the UserProfile interface
  const fieldWeight = 100 / totalFields; // Each field is worth 1/total-fields of 100%

  let progress = 0;

  if (hasChars(data.fullName)) progress += fieldWeight;
  if (hasChars(data.gender)) progress += fieldWeight;
  if (hasChars(data.dateOfBirth)) progress += fieldWeight;
  if (hasChars(data.email)) progress += fieldWeight;
  if (hasChars(data.mobile)) progress += fieldWeight;
  if (hasChars(data.organisation)) progress += fieldWeight;
  if (hasChars(data.country)) progress += fieldWeight;
  if (hasChars(data.city)) progress += fieldWeight;
  if (hasChars(data.userId)) progress += fieldWeight;

  return Math.round(progress);
};


