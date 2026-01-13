import {RELATIONSHIP_STATUS, RelationshipStatusKey} from "./UserRelationShipStatus";


export class UserRelationship {
   private readonly status: RelationshipStatusKey;

   private constructor(relationshipStatus: RelationshipStatusKey) {
       this.status = relationshipStatus;
   }

   public static create(relationshipStatus: string): UserRelationship {
       const validatedRelationship: RelationshipStatusKey = this.validateRelationship(relationshipStatus);
       return new UserRelationship(validatedRelationship);
   }

   private static validateRelationship(relationShip: string): RelationshipStatusKey {
       if (!relationShip) throw new Error('Relationship does not exist');

       const normalized: string = relationShip.trim().toLowerCase();

       for (const key in RELATIONSHIP_STATUS) {
           const value = RELATIONSHIP_STATUS[key as RelationshipStatusKey];

           if(value.includes(normalized)) {
               return key as RelationshipStatusKey;
           }
       }
       throw new Error('Relationship does not exist: ' + relationShip);
    }

    public getValue(): RelationshipStatusKey {
       return this.status;
    }

    public equals(otherStatus: UserRelationship): boolean {
       if (!otherStatus) return false;
       return this.status === otherStatus.getValue();
    }

}