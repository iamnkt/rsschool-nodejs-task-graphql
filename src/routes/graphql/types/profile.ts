import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdType } from "./memberType.js";

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeIdType),
    },
    memberType: {
      type: MemberType,
      resolve: async (profile, _args, context) => {
        return context.memberType.findUnique({
          where: {
            id: profile.memberTypeId,
          }
        })
      }
    }
  }
});