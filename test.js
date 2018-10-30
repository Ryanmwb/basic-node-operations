const fs = require('fs');
fs.readFile('foo.txt', (err, file) => {
 if (err) throw err;
 console.log("first");
});
console.log("second");

function hello(){
    console.log("hello")
};
hello();
console.log("hey back");