module.exports = {
    name: 'ping',
    desc: 'Ping the server',
    syntax: 'ping',
    execute(msg, args, client) {
        // Get the start time
        const start = Date.now();

        // Send the message pong!
        msg.channel.send('pong!').then(msg => {
            // Get the end time
            const end = Date.now();
            // Edit the pong message to display the amount of time it took
            msg.edit(`pong! \`${end - start}ms\``);
        });
    }
}
