const fbkt = require('../../../../../../Fbkt');
const camelCase = require('./index');

describe('select locations', function() {

	it('select locations knex', function (done) {
		const snake = {
			text_field:	"value",
			object_field:	{
				text_field:	"value",
				object_field:	{
					text_field:	"value"
				}
			},
			array_field:	[
				{
					text_field:	"value"
				},
				14,
				"12"
			],
		};
		
		const camel = camelCase(snake);
		fbkt().clog('camel', camel);
		
		
		done();
		
	});

});