import { GraphQLSchema } from "graphql";
import { rootMutation } from "./mutation.js";
import { rootQuery } from "./query.js";

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
