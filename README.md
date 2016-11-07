# fbkt
core functionality for the function bucket server

usage:
```
npm install --save fbkt
```

function bucket is an opinionated toolkit for building a postgres-backed web server that 
helps to quickly pull together data in a JSON format to support web app development.

##current features of the base fbkt packaget
- custom pipeline pattern for developing server-side code
 - error handling
 - workspace persistence
 - simple workflow
- integrated unit-testing (mocha)
- restApi(express)
- customizable data import/export for flat files

##extension libraries
- fbkt-pg
 - dbManager
  - build, wipe, rebuild db for quick dev changes
  - patchDb on deployment
 - coreDb
  - fbkt_core_db schema to track db script management and fbktPipe records
  - exposes /fbkt and /ping api endpoints for default restApi
 - dbAccess
  - wraps knex.js for traditional db access.  (this is an old lib that will be re-written, but it works for now)
- fbkt-pg-graphql (in progress)
 - write
 - customizable data import/export for flat files
 - data composition by configuration(json aggregation in the db)
