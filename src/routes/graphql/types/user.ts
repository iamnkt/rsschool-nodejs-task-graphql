import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";
import DataLoader from "dataloader";

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
      
      resolve: async (user, _args, context, info) => {
        const { dataloaders } = context;

        let dl = dataloaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const profiles = await context.prisma.profile.findMany({
              where: {
                userId: { in: ids },
              },
            });
            const sortedInIdsOrder = ids.map(id => profiles.find(x => x.userId === id));
            
            return sortedInIdsOrder;
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return dl.load(user.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user, _args, context, info) => {
        const { dataloaders } = context;

        let dl = dataloaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const posts = await context.prisma.post.findMany({
              where: {
                authorId: { in: ids },
              },
            });

          const postsByUser = {};
      
          posts.forEach((post) => {
            if (!Object.keys(postsByUser).includes(post.authorId)) {
              postsByUser[post.authorId] = [];
            }
            postsByUser[post.authorId].push(post);
          });
      
          return ids.map((id) => postsByUser[id]);
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return dl.load(user.id);
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user, _args, context, info) => {
        const { dataloaders } = context;

        let dl = dataloaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {            
            const subscribedUsers = await context.prisma.user.findMany({
              where: { 
                subscribedToUser: { 
                  some: {
                    subscriberId: {
                      in: ids,
                    }
                  }
                }
              },
              include: { 
                subscribedToUser: true,
              },
            });

            return ids.map((subscriberId) => {
              const users = subscribedUsers.filter((user) => 
                user.subscribedToUser.every((subscriber) => subscriber.subscriberId === subscriberId),
              );
              return users;
            });
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return dl.load(user.id);
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user, _args, context, info) => {
        const { dataloaders } = context;

        let dl = dataloaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const usersWithSubscription = await context.prisma.user.findMany({
              where: { 
                userSubscribedTo: { 
                  some: {
                    authorId: {
                      in: ids,
                    }
                  }
                }
              },
              include: { 
                userSubscribedTo: true,
              },
            });
        
            return ids.map((authorId) => {
              const users = usersWithSubscription.filter((user) => 
                user.userSubscribedTo.every((subscriber) => subscriber.authorId === authorId),
              );
              return users;
            });
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return dl.load(user.id);
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
