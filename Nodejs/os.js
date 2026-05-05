// The os module helps you get details like:
// CPU information
// Memory (RAM)
// System type (Windows/Linux/macOS)
// User info
// Uptime of system


const os = require("os");

console.log(os.platform()); //Tells your OS type

console.log(os.arch());   //Shows CPU architecture

console.log(os.totalmem()); //Total RAM in bytes

console.log(os.freemem()); //Free RAM available

console.log(os.cpus());  //Info about CPU cores

console.log(os.hostname());  // Computer name