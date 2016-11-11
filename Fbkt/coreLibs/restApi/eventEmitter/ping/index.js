const EventEmitter = require('events');

class PingEmitter extends EventEmitter {};

const __pingEmitter = new PingEmitter();


module.exports = ()=>{
  return __pingEmitter;
};