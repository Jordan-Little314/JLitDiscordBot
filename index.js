const thinkModule = require('./Commands/thinking');
const jokeModule = require('./Commands/joke');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

//Turn the discordjs on to listen to a message
    client.on('message', (message) => {

//Listens to each instance of the message /knock and executes the code below
        if (message.content.startsWith('/knock')) {
            const msg = message.content.split(' ');

//Function knock() returns the formatted joke
                message.reply(jokeModule.knock());

        }
        else if (message.content.startsWith('/thinking')) {
          const msg = message.content.split(' ');
          message.channel.sendMessage("", {
            file: thinkModule.thinking()
          });
        }
    });

const token = process.env.TOKEN;
client.login(token);
