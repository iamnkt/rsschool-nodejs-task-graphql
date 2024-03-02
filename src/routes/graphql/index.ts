import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { rootQuery } from './query.js';

export const schema = new GraphQLSchema({
  query: rootQuery,
  // mutation: rootMutation,
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query: source, variables: variableValues } = req.body;

      return graphql({
        schema,
        source,
        variableValues,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
