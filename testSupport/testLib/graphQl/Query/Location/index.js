"use strict";
const R = require('ramda');
const Promise = require('bluebird');
const fbkt = require('fbkt');
const graphqlHTTP = require('express-graphql');
const gql = require("graphql");

const GeoJsonPoint = new gql.GraphQLObjectType({
	name:   "GeoJsonPoint",
	fields: () => ({
		type:      {
			type: 				gql.GraphQLString
		},
		coordinates:      {
			type: 				new gql.GraphQLList(gql.GraphQLFloat)
		},
	})
});

module.exports = new gql.GraphQLObjectType({
	name: 'Location',
	fields: () => ({
		id: {
			type: gql.GraphQLID,
			resolve(location){
				return location.id
			}
		},
		name: {
			type: gql.GraphQLString
		},
		geoJson: {
			type: GeoJsonPoint
		},
		address1: {
			type: gql.GraphQLString
		},
		address2: {
			type: gql.GraphQLString
		},
		city: {
			type: gql.GraphQLString
		},
		state: {
			type: gql.GraphQLBoolean
		},
		postalCode: {
			type: gql.GraphQLBoolean
		},
	})
});