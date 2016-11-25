'use strict';
const R                 = require('ramda');
const fbkt              = require('../../../../../../../Fbkt');
const graphqlHTTP       = require('express-graphql');
const gql               = require('graphql');
const GraphQLSchema     = gql.GraphQLSchema;
const GraphQLObjectType = gql.GraphQLObjectType;

const initGraphQL = ()=> {
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
          console.log('QUERIES', queryFields);
          console.log('MUTATIONS', mutationFields);

          const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
              name: 'Query',
              fields: () => (queryFields)
            }),
            mutation: new GraphQLObjectType({
              name: 'Mutation',
              fields: () => (mutationFields)
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

module.exports = ()=> {
  if (process.env.NODE_ENV !== 'buildDb') {
    return initGraphQL();
  }
};
































