import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeIdType } from "./memberType.js";
import DataLoader from "dataloader";

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
      resolve: async (profile, _args, context, info) => {
        const { dataloaders } = context;

        let dl = dataloaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const memberTypes = await context.prisma.memberType.findMany({
              where: {
                id: { in: ids },
              },
            });

            const sortedInIdsOrder = ids.map(id => memberTypes.find(x => x.id === id));

            return sortedInIdsOrder;
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return dl.load(profile.memberTypeId);
      }
    }
  }),
});

export const CreateProfileType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
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
  name: 'ChangeProfileInput',
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
