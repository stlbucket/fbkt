const colors = require('colors');
const args           = require('minimist')(process.argv.slice(2));
const NODE_ENV       = process.env.NODE_ENV || args.NODE_ENV;
const envPath        = `./.env.${NODE_ENV}`;
process.env.NODE_ENV = NODE_ENV;

console.log('NODE_ENV', NODE_ENV);

if (NODE_ENV === null || NODE_ENV === undefined) {
  console.log(colors.red('YOU MUST SPECIFY --NODE_ENV ON THE COMMAND LINE'));
  process.exit();
}

try {
  require('dotenv-safe').load({
    allowEmptyValues: false,
    sample: './.env.example',
    path: envPath
  });
} catch (error) {
  console.log(colors.red(`ENV FILE DOES NOT EXIST: ${envPath}`));
  process.exit();
}
