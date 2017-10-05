const thinkModule = require('./Commands/thinking');
const jokeModule = require('./Commands/joke');
const helpModule = require('./Commands/help');

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
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

        else if (message.content.startsWith('/help')) {
          const msg = message.content.split(' ');
          message.channel.sendMessage(helpModule.help())
        }

        else if (message.content.startsWith('/music')) {
          const msg = message.content.split(' ');
          var stream = ""
          var flag = false
          if (msg.length < 2) {
            message.reply("You need to add a link bud")
          }
          else {
            try {
              stream = ytdl(msg[1], {filter : 'audioonly'});
              flag = true;
            }
            catch(err){
              message.reply("Need a valid address")
            };
          }

          if (message.member.voiceChannel && flag) {
            message.member.voiceChannel.join()
              .then(connection => { // Connection is an instance of VoiceConnection
                message.reply('I have successfully connected to the channel!');
                connection.playStream(stream, { seek : 0, volume : 0.5});
              })
              .catch(console.log);
          } else if (!message.member.voiceChannel && flag){
            message.reply('You need to join a voice channel first!');
          }
        }
    });

const token = process.env.TOKEN;
client.login(token);
