# fbkt
function bucket is an opinionated toolkit for building a postgres-backed(optionally, but really it's the only option right now) web server that helps to quickly pull together data in a JSON format to support web app development.

usage:
```
npm install --save fbkt
```

```
npm run test
```

```
npm run dev
```

##base fbkt package
- custom pipeline pattern for developing server-side code (<a href="https://github.com/stlbucket/fbkt/blob/master/Fbkt/coreLibs/fbktPipe/fbktPipe/index.js">fbktPipe</a>)
  - error handling
  - workspace persistence
  - simple workflow
- integrated unit-testing (mocha)
- restApi(express - i would like to break this out into a separate lib so it's easier to change out express at some point)

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
    - data composition by configuration(json aggregation in the db)
- fbkt-pg-graphql (in progress)
  - dynamically compose a graph-ql schema from multiple fbkt-based libs, extending dbAccess.composite structure
- fbkt-login (soon - needs to be refactored from old code)
- fbkt-data-import (future)
  - customizable data import/export for flat files and json for quick custom data sets
- fbkt-config (future)
  - utility to help configure a new fbkt server based on installed libs
- fbkt-react/apollo based clients... 
