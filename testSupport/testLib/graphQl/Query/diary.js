const fbkt = require('../../../../../Fbkt');
const gql = require('graphql');
const Diary = require('./graphs/Diary/index');

module.exports = {
	type: Diary,
	args: {
		id: 							{type: gql.GraphQLInt},
		name:			      	{type:	gql.GraphQLString},
		description:			{type:	gql.GraphQLString},
	},
	resolve(diary, params){
    return {
      name: 'Test Diary'
    }
	}
};