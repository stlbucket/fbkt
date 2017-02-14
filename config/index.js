require('dotenv-safe').load({
  allowEmptyValues: false,
  sample: './.env.example'
});

module.exports = {
	application:	{
		name:		'Function Bucket'
	},
};
