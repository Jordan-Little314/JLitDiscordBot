const randomPuppy = require('random-puppy');

  module.exports = {
    subreddit: function(message, sr, cmd) {
      randomPuppy(sr)
        .then(url => {
          var output = "https://i." + url.slice(7);
          console.log(cmd + " called: " + output);
          if (output.includes("gif")) {
            message.channel.send(output);
          } else {
            message.channel.send("", {
              file: output
            });
          }
        })
    },

    elephant: function(message) {
      randomPuppy('babyelephantgifs')
        .then(url => {
          console.log ("Elephant called: " + url);
          message.channel.send(url);
        })
    }
  }
