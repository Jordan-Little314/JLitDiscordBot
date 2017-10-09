const thinkModule = require('./Commands/thinking');
const jokeModule = require('./Commands/joke');
const helpModule = require('./Commands/help');
const musicModule = require('./Commands/music');


const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0});

var commands = [
  {
    command: "joke",
    description: "Says a random joke",
    execute: function(message, params) {
      message.reply(jokeModule.knock());
    }
  },

  {
    command: "thinking",
    description: "Posts a random thinking emoji",
    execute: function(message, params) {
      message.channel.sendMessage("", {
        file: thinkModule.thinking()
      });
    }
  },

  {
    command: "help",
    description: "Posts a list of commands",
    execute: function(message, params) {
      message.channel.sendMessage(helpModule.help());
    }
  },

  {
    command: "music",
    description: "Allows user to queue, play, stop, or skip music in their voice channel",
    execute: function(message, params) {
      if (params.length < 2) {
        message.channel.sendMessage("Please add parameters to -music, use -help for info.");
      }
      if (params[1] == "q" || params[1] == "que" || params[1] == "queue") {
          musicModule.queue(message, params, client, ytApiKey);
          //musicModule.queue(message, params, client);
      } else if (params[1] == "stop") {
        musicModule.stop(message, params);
      } else if (params[1] == "play") {
        musicModule.play(message, params, client);
      } /*else if (params[1] == "skip") {
        //musicModule.skip(message, params, client);
      }*/
    }

  }
];

client.on('ready', () => {
  console.log('I am ready!');
});

//Turn the discordjs on to listen to a message
    client.on('message', (message) => {

      if (message.channel.type == "dm" && message.author.id != client.user.id) { // If the message sent was a DM and not by the Bot,
        // to prevent infinite looping
          message.channel.sendMessage("Please use -help in a public chat room to see a list of commands!");
      } else if (message.channel.type == "text") { // Message recieved on text channel
          if (message.isMentioned(client.user)) {
            message.reply("Hey there! Use -help for a list of commands!");
          } else {
            if (message.content.startsWith('-')) {
                handleCommand(message, message.content.substring(1));
            }
          }
      }
    });

function handleCommand(message, text) {
  var params = text.split(" ");
  var command = searchCommand(params[0]);

  if (command) {
    command.execute(message, params);
  }
}

function searchCommand(commandName) {
  for (var i = 0; i < commands.length; i++) {
    if (commands[i].command == commandName.toLowerCase()) {
      return commands[i];
    }
  }
}

const token = process.env.TOKEN;
const ytApiKey = process.env.YTKEY;
client.login(token);
