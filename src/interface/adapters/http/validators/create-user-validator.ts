import { RELATIONSHIP_STATUS } from "../../../../domain/User/entity/vo/information/personalData/UserRelationShipStatus";
import { VISIBILITY_STATUS } from "../../../../domain/User/entity/vo/UserVisibilityStatus";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateCreateUserRequest(body: unknown): Record<string, string> | null {
  if (typeof body !== "object" || body === null) {
    return { body: "Body must be an object" };
  }

  const d = body as Record<string, unknown>;
  const errors: Array<[string, string]> = [];
  const add = (k: string, m: string) => errors.push([k, m]);

  const userName = typeof d.userName === "string" ? d.userName.trim() : "";
  const name = typeof d.name === "string" ? d.name.trim() : "";
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const password = typeof d.password === "string" ? d.password : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";
  const birth = typeof d.birth === "string" ? d.birth.trim() : "";
  const relationship = typeof d.relationship === "string" ? d.relationship.trim() : "";
  const bio = typeof d.bio === "string" ? d.bio.trim() : "";
  const visibility = typeof d.visibility === "string" ? d.visibility.trim() : "";

  const location = typeof d.location === "object" && d.location !== null ? (d.location as Record<string, unknown>) : null;
  const country = location && typeof location.country === "string" ? location.country.trim() : "";
  const state = location && typeof location.state === "string" ? location.state.trim() : "";
  const city = location && typeof location.city === "string" ? location.city.trim() : "";

  if (!userName || userName.length < 3 || userName.length > 20) add("userName", "Must be 3-20 characters");
  if (!name) add("name", "Must be a non-empty string");
  if (!email || !EMAIL.test(email)) add("email", "Invalid format");
  if (!password || password.length < 8) add("password", "Must contain at least 8 characters");
  if (!phone) add("phone", "Must be a non-empty string");

  const birthDate = birth && DATE.test(birth) ? new Date(birth) : null;
  if (!birth || !birthDate || Number.isNaN(birthDate.getTime())) {
    add("birth", birth ? "Invalid date format" : "Must be a non-empty string");
  }

  if (!location) add("location", "Must be an object");
  if (location && !country) add("location.country", "Must be a non-empty string");
  if (location && !state) add("location.state", "Must be a non-empty string");
  if (location && !city) add("location.city", "Must be a non-empty string");

  if (!relationship) add("relationship", "Must be a non-empty string");
  else if (!Object.values(RELATIONSHIP_STATUS).some((v) => v.includes(relationship.toLowerCase()))) {
    add("relationship", "Invalid value");
  }

  if (!bio) add("bio", "Must be a non-empty string");

  if (!visibility) add("visibility", "Must be a non-empty string");
  else if (!Object.values(VISIBILITY_STATUS).some((v) => v.includes(visibility.toLowerCase()))) {
    add("visibility", "Invalid value");
  }

  return errors.length > 0 ? Object.fromEntries(errors) : null;
}
