const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// init object
const myEmitter = new MyEmitter();

// add listener
myEmitter.on('log',(msg)=> logEvents(msg));

// emmit event
setTimeout(()=>{
    // emit event
    myEmitter.emit('log','Log Event Emitted');
},2000);