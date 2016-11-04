const fbktQlStudioProject = {
	name:	'string',
	uid:	'uid',
	dataSources:	{
		pg:	[],
		couch: [],
		relay: [],
		whatevs: []
	},
	queries: [
		{
			dataSource: "a datasource defined above",
			queryStructure: "a graphQl query"
		}
	],
	visualizations: {
		mapbox:	[
			{
				name:			'string',
				layers:	{
					queries:	['any number of queries defined above'],
					transform:	'a function that maps query results to the appropriate structure for a map layer'
				}
			}
		],
		plotly:	[
			{
				name:	'string',
				"plotDefinition - comment":	'structure tbd, dictated by plotly lib most likely, but something like:',
				plotDefinition:	{
					title:	'string',
					etc:		'other top-level stuff',
					ySeries:	[
						{
							yAxis:	{
								etc:  'whatevs',
								queries:	['any number of queries'],
								transform:	'a function that maps to y series, this will have some kind of default where you just do something like queries.name.field'
							},
							xAxes: [
								{
									queries:	['any number of queries'],
									transform:	'a function that maps to x series, this will have some kind of default where you just do something like queries.name.field'
								}
							]
						}
					]
				}
			}
		],
		d3:	[
			{
				name:	'string',
				d3Definition: 'analagous to plotly...'
			}
		]
	}


};
