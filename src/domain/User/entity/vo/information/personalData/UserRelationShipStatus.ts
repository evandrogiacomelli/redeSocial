

export type RelationshipStatusMap = Record<string, readonly string[]>;


export const RELATIONSHIP_STATUS: RelationshipStatusMap = {
    SINGLE: ["single", "solteiro"],
    MARRIED: ["married", "casado"],
    DATING: ["dating", "namorando"],
    DIVORCED: ["divorced", "divorceado"],
    WIDOWED: ["widowed", "viuvo"],
} as const;

export type RelationshipStatusKey = keyof typeof RELATIONSHIP_STATUS;