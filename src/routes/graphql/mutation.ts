import { GraphQLObjectType, GraphQLString } from "graphql";
import { CreatePostType, PostType, UpdatePostType } from "./types/post.js";
import { CreateUserType, UpdateUserType, UserType } from "./types/user.js";
import { CreateProfileType, ProfileType, UpdateProfileType } from "./types/profile.js";
import { UUIDType } from "./types/uuid.js";
import { Context } from "./types/context.js";

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: CreatePostType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.post.create({
          data: args.dto,
        });
      }
    },
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: CreateUserType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      }
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: CreateProfileType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.profile.create({
          data: args.dto,
        });
      }
    },
    changePost: {
      type: PostType,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: UpdatePostType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: UpdateProfileType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: {
          type: UUIDType,
        },
        data: {
          type: UpdateUserType,
        }
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        })
      },
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, context: Context) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          }
        });
        return 'User deleted';
      }
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, context: Context) => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          }
        });
        return 'Post deleted';
      }
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, context: Context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          }
        });
        return 'Profile deleted';
      }
    },
  }
});
