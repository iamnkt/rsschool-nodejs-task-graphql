import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberType, MemberTypeIdType } from "./types/memberType.js";

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_, _args, context) => {
        return context.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdType),
        }
      },
      resolve: async (_, args: { id: string }, context) => {
        return context.memberType.findUnique({
          where: {
            id: args.id,
          }
        });
      },
    }
  }
});