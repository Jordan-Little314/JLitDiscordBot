var stopped = true;
var nowPlayingData = {};
var queue = [];
var isConnected = false;

var voiceHandler = null;
var voiceConnection = null;

var messageHandler = null;
var clientHandler = null;

var ytKey = null;


const ytdl = require("ytdl-core");
const request = require("request");


module.exports = {
    queue: function(message, params, client, ytApiKey) {

      messageHandler = message;
      clientHandler = client;
      ytKey = ytApiKey;

      if (message.member.voiceChannel && !isConnected) {
        isConnected = true;
        message.member.voiceChannel.join().then(connection => {
          voiceConnection = connection;
        });
      }

      if (params.length < 3) {
        message.channel.send("Please put song URL to queue using `-music q <URL>`.");
        return;
      }


    var regEx = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
    var match = params[2].match(regEx);

    if (match && match[2]) {
      //queuePlaylist(match[2], message, client);
      message.channel.send("Playlists are not currently supported, please queue individual songs!");
    } else {
      addToQueue(params[2], message, false, client);
    }
  },

  play: function(message, params, client) {
    if (stopped) {
      stopped = false;
      if (!isQueueEmpty()) {
        playNextSong(message, client);
      }
    } else {
      message.reply("Playback is already running.");
    }
  },

  stop: function(message, params) {
    if (stopped) {
      message.reply("Playback is already stopped.");
    } else {
      stopped = true;
      if (voiceHandler !== null) {
        voiceHandler.end();
      }
      message.reply("Music stopping.");
    }
  },

  skip: function(message, params) {
    if (voiceHandler !== null) {
      message.reply("Skipping");
      if (voiceHandler !== null) {
        voiceHandler.end();
    } else {
      message.reply("There is nothing being played");
      }
    }
  }
}

function queuePlaylist (playlistId, message, client, pageToken = '') {
    request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + ytKey + "&pageToken=" + pageToken, (error, response, body) => {
      var json = JSON.parse(body);
      if ("error" in json) {
        message.reply("An error has occured: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
      } else if (json.items.length == 0) {
        message.reply("No videos found within playlist.");
      } else {
        for (var i = 0; i < json.items.length; i++) {
            addToQueue(json.items[i].snippet.resourceId.videoId, message, true, client)
        }
        if(json.nextPageToken == null) {
          return;
        }
        //queuePlaylist(playlistId, message, json.nextPageToken);
      }
    });
}

function addToQueue(video, message, mute=false, client) {
    var videoID = getVideoID(video);

    ytdl.getInfo("https://www.youtube.com/watch?v=" + videoID, (error, info) => {
      if (error) {
        message.reply("The requested video (" + videoID + ") does not exist or cannot be played.");
        console.log("Error (" + videoID + "): " + error);
      } else {
        queue.push({title: info["title"], id: videoID, user: message.author.username});
        if (!mute) {
          message.reply('"' + info["title"] + '" has been added to the queue.');
        }
        if (!stopped && !isBotPlaying() && queue.length === 1) {
          playNextSong(message, client);
        }
      }

    });

}

function playNextSong(message, client) {
    if (isQueueEmpty()) {
      message.channel.send("The queue is empty!");
    }

    var videoID = queue[0]["id"];
    var title = queue[0]["title"];
	  var user = queue[0]["user"];

    nowPlayingData["title"] = title;
    nowPlayingData["user"] = user;

    messageHandler.channel.send('Now playing: "' + title + '" (requested by ' + user + ')');
    clientHandler.user.setGame(title);

    var audioStream = ytdl("https://www.youtube.com/watch?v=" + videoID);
    voiceHandler = voiceConnection.playStream(audioStream);

    voiceHandler.once("end", reason => {
      voiceHandler = null;
      clientHandler.user.setGame();
      if (!stopped && !isQueueEmpty()) {
        playNextSong();
      }
    });

    queue.splice(0, 1);
}

function getVideoID(str) {
    var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
    var matches = str.match(regex);

    if(matches) {
  		return matches[1];
  	} else {
  		return str;
  	}
}

function isBotPlaying() {
    return voiceHandler !== null;
}

function isQueueEmpty() {
    return queue.length === 0;
}
