import { RELATIONSHIP_STATUS } from "../../../../domain/User/entity/vo/information/personalData/UserRelationShipStatus";
import { VISIBILITY_STATUS } from "../../../../domain/User/entity/vo/UserVisibilityStatus";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateUpdateMeRequest(body: unknown): Record<string, string> | null {
  if (typeof body !== "object" || body === null) {
    return { body: "Body must be an object" };
  }

  const d = body as Record<string, unknown>;
  const errors: Array<[string, string]> = [];
  const add = (k: string, m: string) => errors.push([k, m]);

  const name = typeof d.name === "string" ? d.name.trim() : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";
  const birth = typeof d.birth === "string" ? d.birth.trim() : "";
  const relationship = typeof d.relationship === "string" ? d.relationship.trim() : "";
  const bio = typeof d.bio === "string" ? d.bio.trim() : "";
  const visibility = typeof d.visibility === "string" ? d.visibility.trim() : "";

  const location = typeof d.location === "object" && d.location !== null ? (d.location as Record<string, unknown>) : null;
  const country = location && typeof location.country === "string" ? location.country.trim() : "";
  const state = location && typeof location.state === "string" ? location.state.trim() : "";
  const city = location && typeof location.city === "string" ? location.city.trim() : "";

  const allowedFields = new Set([
    "name",
    "phone",
    "birth",
    "location",
    "relationship",
    "bio",
    "visibility",
  ]);

  for (const key of Object.keys(d)) {
    if (!allowedFields.has(key)) add(key, "Field cannot be updated");
  }

  if ("userName" in d) add("userName", "Field cannot be updated");
  if ("email" in d) add("email", "Field cannot be updated");

  if ("name" in d && !name) add("name", "Must be a non-empty string");
  if ("phone" in d && !phone) add("phone", "Must be a non-empty string");

  if ("birth" in d) {
    const birthDate = birth && DATE.test(birth) ? new Date(birth) : null;
    if (!birth || !birthDate || Number.isNaN(birthDate.getTime())) {
      add("birth", birth ? "Invalid date format" : "Must be a non-empty string");
    }
  }

  if ("relationship" in d) {
    if (!relationship) add("relationship", "Must be a non-empty string");
    else if (!Object.values(RELATIONSHIP_STATUS).some((v) => v.includes(relationship.toLowerCase()))) {
      add("relationship", "Invalid value");
    }
  }

  if ("bio" in d && !bio) add("bio", "Must be a non-empty string");

  if ("visibility" in d) {
    if (!visibility) add("visibility", "Must be a non-empty string");
    else if (!Object.values(VISIBILITY_STATUS).some((v) => v.includes(visibility.toLowerCase()))) {
      add("visibility", "Invalid value");
    }
  }

  if ("location" in d) {
    if (!location) add("location", "Must be an object");
    else {
      const locationAllowed = new Set(["country", "state", "city"]);
      for (const key of Object.keys(location)) {
        if (!locationAllowed.has(key)) add(`location.${key}`, "Field cannot be updated");
      }
      if ("country" in location && !country) add("location.country", "Must be a non-empty string");
      if ("state" in location && !state) add("location.state", "Must be a non-empty string");
      if ("city" in location && !city) add("location.city", "Must be a non-empty string");
    }
  }

  return errors.length > 0 ? Object.fromEntries(errors) : null;
}
