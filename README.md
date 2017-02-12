# fbkt
function bucket is an opinionated toolkit for building a web server that helps to quickly pull together data in a JSON format to support web app development.

usage:  
for a simple fbkt package, use the <a href="https://github.com/stlbucket/fbkt-extension-starter">fbkt-extension-starter</a>

##base fbkt package
- <a href="https://github.com/stlbucket/fbkt/blob/master/Fbkt/coreLibs/fbktPipe/fbktPipe/index.js">fbktPipe</a>
  - custom pipeline pattern for developing server-side code
- fbktServer
- utility
  - file i/o
  - handlebars templating
  - crypto
  - custom errors
- restApi
  - express-based (this lib could be broken out to support other servers)
- fbktPassport 
  - token-based auth
  - this area of the stack should be improved...  <a href="https://github.com/paypal/seifnode">seif?</a>, oauth, etc.
 - graphQl
  - dynamically compose a graph-ql schema from multiple fbkt-based libs, extending dbAccess.composite structure

##extension libraries
- <a href="https://github.com/stlbucket/fbkt-pg">fbkt-pg</a>
  - dbManager
    - build, wipe, rebuild db for quick dev changes
    - patchDb on deployment
  - coreDb
    - fbkt_core_db schema to track db script management and fbktPipe records
    - exposes /fbkt and /ping api endpoints for default restApi
  - dbAccess
    - wraps knex.js for traditional db access.  (this is an old component that will be re-written, but it works for now)
    - data composition by configuration(json aggregation in the db)
- <a href="https://github.com/stlbucket/fbkt-login">fbkt-login</a>
 - requires fbkt-pg
 - provides basic schema for managing organizations, contacts, licenses
