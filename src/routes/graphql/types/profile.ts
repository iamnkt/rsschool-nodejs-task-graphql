import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdType } from "./memberType.js";

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
    memberType: {
      type: MemberType,
      resolve: async (profile, _args, context) => {
        return context.prisma.memberType.findUnique({
          where: {
            id: profile.memberTypeId,
          }
        })
      }
    }
  }),
});

export const CreateProfileType = new GraphQLInputObjectType({
  name: 'CreateProfileType',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
  }),
});

export const UpdateProfileType = new GraphQLInputObjectType({
  name: 'UpdateProfileType',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdType,
    },
  }),
});
