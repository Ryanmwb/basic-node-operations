const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 };

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
        case "echo":
            //we will add the functionality of echo next within the object commandLibrary    
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray[1], userInputArray[2]);
            break;
        case "tail":
            commandLibrary.tail(userInputArray[1], userInputArray[2]);
            break;
        case "readdir":
            commandLibrary.readdir();
        default: 
            commandLibrary.error(command);
    };
};

//where we will store the logic of our commands
 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath){
        const fileName = fullPath[0];
        console.log(fileName);
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            done(data);
        });
    },
    "head": function(fileName, lines){
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            data = data.toString("utf8");
            var textArray = data.split("\n");
            var trimText = textArray.slice(0, lines);
            var newText = trimText.join("\n");
            done(newText);
        });
    },
    "tail": function(fileName, lines){
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            data = data.toString('utf8');
            var textArray = data.split("\n");
            var trimText = textArray.slice(-lines, textArray.length);
            var newText = trimText.join("\n");
            done(newText);
        });
    },
    "readdir": function(){
        fs.readdir('.', (err, files) => {
            if(err) throw err;
            var result = files.forEach(file => process.stdout.write(file.toString() + "\n"));
            done(result);
          });
          console.log("readdir")
    },
    "error": function(command){
        done("error... command '" + command + "' does not exist.")
    }
};

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;