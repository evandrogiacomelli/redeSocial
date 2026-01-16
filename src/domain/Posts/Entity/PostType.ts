export const POST_TYPES = ["IMAGE", "VIDEO"] as const;
export type PostType = (typeof POST_TYPES)[number];
