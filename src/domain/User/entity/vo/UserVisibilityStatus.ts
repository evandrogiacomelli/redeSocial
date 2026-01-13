export type VisibilityStatusMap = Record<string, readonly string[]>;

export const VISIBILITY_STATUS: VisibilityStatusMap = {
    PUBLIC: ["public"],
    PRIVATE: ["private"],
} as const;

export type VisibilityStatusKey = keyof typeof VISIBILITY_STATUS;
