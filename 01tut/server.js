// 1) node runs on a server - not in a broswer (backend not frontend)
// 2) The console is the terminal window
console.log("hello world");
// 3) global objext instead of window object
// console.log(global);
// 4) Has common core modules that we will explore 
// 5) CommmonJS modules instead of ES6 modules
// 6) Node js missing some js APIs like fetch

const os = require("os");
const path = require("path")
const {add, minus,times,divide} = require("./math")

console.log(add(2,3))
console.log(minus(2,3))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.parse(__filename))
