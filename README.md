# fbkt
function bucket is an opinionated toolkit for building a postgres-backed(optionally, but really it's the only option right now) web server that helps to quickly pull together data in a JSON format to support web app development.

usage:  (improved configuration setup is on the way...)
```
npm install --save fbkt
```
create a file named ***devServer.js***

```
let Fbkt = require('fbkt');
let config = require('./config/dev');
const fbktpg = require('./index');
let appLibs = {
	dbAccess:		fbktpg.dbAccess,
	coreDb:			fbktpg.coreDb,
	dbManager:	fbktpg.dbManager,
	pgRestApi:	fbktpg.pgRestApi
};


var command = process.argv[3] || 'runServer';
const fbkt = Fbkt(config, appLibs);

fbkt.clog('FBKT CONFIG', fbkt.config, true);
fbkt.runServer(command);
```
add to package.json
```
  "scripts": {
    "dev": "node devServer dev",
    "test": "node devServer dev runAllUnitTests",
    "wipeDb": "node devServer dev wipeDb",
    "buildDb": "node devServer dev buildDb
  },
```
create config directory structure like this:  <a href="https://github.com/stlbucket/fbkt-pg/tree/master/config">fbkt-pg-config</a>   (includes db config that the base libs don't use)

```
npm run test
```

```
npm run dev
```

##base fbkt package
- <a href="https://github.com/stlbucket/fbkt/blob/master/Fbkt/coreLibs/fbktPipe/fbktPipe/index.js">fbktPipe</a>
  - custom pipeline pattern for developing server-side code
    - error handling
    - workspace persistence
    - simple workflow
- fbktServer
- unitTest
  - integrated unit-testing (mocha)
- utility
  - file i/o
  - templating
  - etc.
- restApi
  - express-based (this lib could be broken out to support other servers)
- fbktPassport 
  - token-based auth
  - this area of the stack should be improved...  <a href="https://github.com/paypal/seifnode">seif?</a>, oauth, etc.

##extension libraries
- <a href="https://github.com/stlbucket/fbkt-pg">fbkt-pg</a>
  - dbManager
    - build, wipe, rebuild db for quick dev changes
    - patchDb on deployment
  - coreDb
    - fbkt_core_db schema to track db script management and fbktPipe records
    - exposes /fbkt and /ping api endpoints for default restApi
  - dbAccess
    - wraps knex.js for traditional db access.  (this is an old lib that will be re-written, but it works for now)
    - data composition by configuration(json aggregation in the db)
- <a href="https://github.com/stlbucket/fbkt-pg-graphql">fbkt-pg-graphql</a> (in progress)
  - dynamically compose a graph-ql schema from multiple fbkt-based libs, extending dbAccess.composite structure
- fbkt-login (soon - needs to be refactored from old code)
- fbkt-data-import (future)
  - customizable data import/export for flat files and json for quick custom data sets
- fbkt-config (future)
  - utility to help configure a new fbkt server based on installed libs
- fbkt-react/apollo based clients... 
