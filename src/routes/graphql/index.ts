import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { schema } from './schema.js';

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

      const validationResults = validate(schema, parse(source), [depthLimit(5)]);

      if (validationResults.length) {
        return {
          errors: validationResults,
        };
      }

      const contextValue = {
        prisma,
      }

      return graphql({
        schema: schema,
        source,
        variableValues,
        contextValue,
      });
    },
  });
};

export default plugin;
