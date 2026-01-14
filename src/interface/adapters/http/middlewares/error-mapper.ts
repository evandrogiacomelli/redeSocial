import { HttpError } from "../http/http-error";

export function mapError(error: unknown): HttpError {
  if (error instanceof HttpError) return error;

  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message === "Missing token") {
    return new HttpError(401, "UNAUTHORIZED", message);
  }

  return new HttpError(500, "INTERNAL_ERROR", message);
}
