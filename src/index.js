const { Client, Collection } = require("discord.js");

// Get the bot's presence from include
const { prefix, presence } = require("./include/config.json")

// Load our environment variables from the .env file
require("dotenv").config();

// Define bot client
const client = new Client();
client.commands = new Collection();

// Runs when the bot is ready
client.once("ready", () => {
    // Set the bot's presence
    client.user.setStatus(presence.status);
    client.user.setActivity(presence.activity, { type: presence.activityType });

    // Log information
    console.log(`${client.user.username} is online`);
});

// Runs every time a message is sent
client.on("message", msg => {
    // Don't allow commands to be run by bots or in DMs
    if (msg.author.bot || msg.channel.type == "dm") return;

    // If the message starts with the prefix
    if (msg.content.startsWith(prefix)) {
        // Get the args passed by removing the prefix and spliting at whitespaces
        const args = msg.content.slice(prefix.length).split(/ +/);
        // Get the command by shifting the first argument out of args
        const cmd = args.shift().toLowerCase();

        // Temporary hard-coded ping command will be migrated to files later
        if (cmd == "ping")
            return msg.reply("pong!");
    }
    // If the message starts with a ping
    else if (msg.content.startsWith(`<@!${client.user.id}`)) {
        // Get the args passed by spliting the message at whitespaces and getting rid of the "mention"
        const args = msg.content.split(/ +/).slice(1);
        // Get the command by shifting the first argument out of args
        const cmd = args.shift().toLowerCase();

        // Temporary hard-coded ping command will be migrated to files later
        if (cmd == "ping")
            return msg.reply("pong!");
    }

    return;
});

// Log the bot in with the token from environment variables
client.login(process.env.PST_TOKEN);
