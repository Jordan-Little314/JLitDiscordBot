const thinkModule = require('./Commands/thinking');
const jokeModule = require('./Commands/joke');
const helpModule = require('./Commands/help');
const musicModule = require('./Commands/music');
const redditPicModule = require('./Commands/redditPictures');
const miscModule = require('./Commands/misc');
const casinoModule = require('./Commands/casino');


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
      message.channel.send("", {
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
      } else if (params[1] == "stop" || params[1] == "s") {
        musicModule.stop(message, params);
      } else if (params[1] == "play" || params[1] == "p") {
        musicModule.play(message, params, client);
      } /*else if (params[1] == "skip") {
        //musicModule.skip(message, params, client);
      }*/
    }
  },

  {
    command: "puppy",
    description: "Calls on random-puppy API and returns an imgur link to a random picture from reddit.com/r/puppies",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'puppies', 'Puppy');
    }
  },

  {
    command: "cat",
    description: "Random cat picture grabbed from reddit.com/r/catpictures using random-puppy API",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'catpictures', 'Cat');
    }
  },

  {
    command: "donald",
    description: "Random donald pic",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'the_donald', 'Donald');
    }
  },

  {
    command: "lewd",
    description: "Random lewd pic",
    execute: function(message, parmas) {
      redditPicModule.subreddit(message, 'lewd', 'Lewd');
    }
  },

  {
    command: "cougs",
    description: "Random pic from /r/wsu",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'wsu', 'Cougs');
    }
  },

  {
    command: "anime",
    description: "Random pic from /r/anime",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'anime', 'Anime');
    }
  },

  {
    command: "hentai",
    description: "Random pic from /r/hentai... For Cole",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'hentai', 'Hentai');
    }
  },

  {
    command: "elephant",
    description: "Random pic from /r/babyelephantgifs",
    execute: function(message, params) {
      redditPicModule.elephant(message);
    }
  },

  {
    command: "ecchi",
    description: "Random pic from /r/ecchi... For Bryan",
    execute: function(message, params) {
      redditPicModule.subreddit(message, 'ecchi', 'Ecchi');
    }
  },

  {
    command: "fuck",
    description: "plays a mp3 sound file of someone saying 'fuck'",
    execute: function(message, params) {
      miscModule.fuck(message);
    }
  },

  {
    command: "casino",
    description: "Casino which users can bet Lit Bux on",
    execute: function(message, params) {
      message.channel.send("Not yet implemented");
    }
  },

  {
    command: "dracarys",
    description: "Freja attacks",
    execute: function(message, params) {
      //if (Discord.id == 193139492528455680) {
        miscModule.dracarys(message, params);
      //} else {
      //  message.channel.send("This command is only supported in the Church channel");
      //}
    }
  },

  {
    command: "reddit",
    description: "pulls pictures from the subreddit given via params",
    execute: function(message, params) {
      if (params.length < 2) {
        message.channel.send("Please input a subreddit you would like to grab pictures from");
      } else {
        redditPicModule.subreddit(message, params[1], params[1]);
      }
    }
  },

  {
    command: "clean",
    description: "Clears the text channel of the bots last 100 posts",
    execute: function(message, params) {
      miscModule.clean(message);
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
      } else if (message.channel.type == "text") {
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
