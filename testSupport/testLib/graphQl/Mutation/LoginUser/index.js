"use strict";
const fbkt = require('fbkt');
const gql = require('graphql');
const AuthenticatedUser = require('../../Query/graphs/AuthenticatedUser/index');
const loginUser = require('../../../loginUser');

module.exports = {
	name:        'LoginUser',
	type:					AuthenticatedUser,
	description: 'Logemin',
	args:        {
		login: {type: new gql.GraphQLNonNull(gql.GraphQLString)},
		password: {type: new gql.GraphQLNonNull(gql.GraphQLString)}
	},
	resolve:     (value, params) => {
		return loginUser({
			params:	params
		})
	}
};