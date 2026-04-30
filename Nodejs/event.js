const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('greet', ()=>{
    console.log("Hello User");
})

emitter.on('userLogin', (username)=> {
    console.log(username + " Logged In");
})


emitter.emit('greet');

emitter.emit('userLogin', 'Anurag');