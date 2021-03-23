const fs = require("fs");
const file = require(`${process.cwd()}/src/data/config.json`);

module.exports = {
    name: "set_answer",
    desc: "Set the answer for math challenge",
    syntax: "set_answer <answer>",
    execute(msg, args, client) {
        // Only administrators and server owners can execute the command
        if (!msg.member.hasPermission("ADMINISTRATOR") && msg.member.id != msg.guild.ownerID) {
            return msg.channel.send("Only administrators can run this command.");
        }

        // Print syntax
        if (!args[0]) {
            return msg.channel.send(`Syntax: ${this.syntax}`);
        }

        // Makes sure its a number
        if (isNaN(args[0])) {
            return msg.channel.send("The answer has to be an integer.");
        }

        let number = Number.parseFloat(args[0]);

        // Makes sure its an integer
        if (!Number.isInteger(number)) {
            return msg.channel.send("The answer has to be an integer.");
        }

        // Sets the answer
        file.challenge_answer = Number.parseInt(number);

        // Write to JSON
        fs.writeFile(`${process.cwd()}/src/data/config.json`, JSON.stringify(file, null , 2), function writeJSON(e) {
            if (e) {
                return console.log(e);
            }
        });

        // Send confirmation
        return msg.channel.send(`Successfully set answer as ${Number.parseInt(args[0])}`);
    }
}