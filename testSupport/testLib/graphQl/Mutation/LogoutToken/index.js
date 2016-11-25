"use strict";
const fbkt = require('fbkt');
const gql = require('graphql');
const logoutToken = require('../../../logoutToken');

module.exports = {
	name:        'LogoutToken',
	type:					gql.GraphQLString,
	description: 'Logemout',
	args:        {
		token: {type: new gql.GraphQLNonNull(gql.GraphQLString)}
	},
	resolve:     (value, params) => {
		return logoutToken({
			user:	params
		})
	}
};