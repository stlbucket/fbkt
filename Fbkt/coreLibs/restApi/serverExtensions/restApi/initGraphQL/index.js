"use strict";
const R                 = require('ramda');
const fbkt = require('../../../../../../Fbkt');
const graphqlHTTP       = require('express-graphql');
const gql               = require('graphql');
const GraphQLSchema     = gql.GraphQLSchema;
const GraphQLObjectType = gql.GraphQLObjectType;

module.exports = ()=> {
  return fbkt().FbktPipe({
    name: 'initFbktGraphQl',
    filename: __filename,
    expectedParams: {},
    pipelineParams: {},
    pipelineSteps: {
      'initFbktGraphQl': (callInfo)=> {
        const libGraphQls    = fbkt().getComponentFromAllLibs('graphQl');

        if (libGraphQls.length > 0){
          const queryFields    = R.mergeAll(R.pluck('query', libGraphQls));
          const mutationFields = R.mergeAll(R.pluck('mutation', libGraphQls));

          const queries = R.merge(queryFields, {
            ping: {
              type: gql.GraphQLString,
              args: {
                input: {type: new gql.GraphQLNonNull(gql.GraphQLString)}
              },
              resolve(diary, params){
                return params.input
              }
            }
          });

          const mutations = R.merge(mutationFields, {
            ping: {
              name: 'Ping Mutation',
              type: gql.GraphQLString,
              description: 'Ping Mutation',
              args: {
                input: {type: new gql.GraphQLNonNull(gql.GraphQLString)}
              },
              resolve: (value, params) => {
                return {
                  pingMutationOutput: params.input
                }
              }
            }
          });
          fbkt().clog('GRAPH QL CONFIG', {
            queries:  queries,
            mutations: mutations
          });

          const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
              name: 'Query',
              fields: () => (queries)
            }),
            mutation: new GraphQLObjectType({
              name: 'Mutation',
              fields: () => (mutations)
            })
          });

          fbkt().app.use('/graphql', graphqlHTTP({
            schema: schema,
            // graphiql: true
          }));
        } else {
          console.log('NO GRAPH QL LIBS')
        }
      }
    }
  }, {});
};

// module.exports = ()=> {
//   if (process.env.NODE_ENV !== 'buildDb') {
//     return initGraphQL();
//   }
// };
































