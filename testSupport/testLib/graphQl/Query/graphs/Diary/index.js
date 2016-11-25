"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('../../../../../../Fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");

// const Location = require('../Location/index');

module.exports = new gql.GraphQLObjectType({
	name: 'Hello',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(diary){
				return diary.id
			}
		},
		name: {
			type: gql.GraphQLString
		},
		description: {
			type: gql.GraphQLString
		},
		// location: {
		// 	type:	Location,
		// 	resolve: (contact)=>{
		// 		return fbkt().dbTree.fbkt_login.table.location.findOne({
		// 			params:	{
		// 				id:	contact.locationId,
		// 			}
		// 		});
		// 	}
		// },
	})
});