const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

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
            commandLibrary.head(userInputArray.slice(1, 2), userInputArray.slice(2, 3));
            break;
        default: 
            commandLibrary.error(command);
    }
}

//where we will store the logic of our commands
 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath){
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            done(data);
        });
    },
    "head": function(fileName, lines){
        fs.readFile(fileName, (err, data) => {
            if(err) throw err;
            var textArray = data.split("\n");
            var trimText = textArray.slice(0, n-1);
            var newText = trimText.join("\n");
            done(newText);
        });
    },
    "error": function(command){
        done("error... command '" + command + "' does not exist.")
    }
};

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;