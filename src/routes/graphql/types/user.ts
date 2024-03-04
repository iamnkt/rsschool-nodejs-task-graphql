import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: { 
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: async (user, _args, context) => {
        return context.prisma.profile.findUnique({
          where: {
            userId: user.id,
          },
        });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user, _args, context) => {
        return context.prisma.post.findMany({
          where: {
            authorId: user.id,
          },
        });
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user, _args, context) => {
        return context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: user.id,
              },
            },
          },
        });
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user, _args, context) => {
        return context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: user.id,
              },
            },
          },
        });
      }
    },
  })
});

export const CreateUserType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { 
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});

export const UpdateUserType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { 
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});
