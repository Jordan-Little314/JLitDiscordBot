const randomPuppy = require('random-puppy');

  module.exports = {
      puppy: function(message) {
        randomPuppy('puppies')
            .then(url => {
                var output = "https://i." + url.slice(7);
                console.log("Puppy called: " + output);
                message.channel.send("", {
                  file: output
                });
            })
    },

    cat: function(message) {
      randomPuppy('catpictures')
        .then(url => {
          var output = "https://i." + url.slice(7);
          console.log("Cat called: " + output);
          message.channel.send("", {
            file: output
          });
        })
    },

    donald: function(message) {
      randomPuppy('the_donald')
        .then(url => {
          var output = "https://i." + url.slice(7);
          console.log("Donald called: " + output);
          message.channel.send("", {
            file: output
          });
        })
    },

    anime: function(message) {
      randomPuppy('anime')
        .then(url => {
          var output = "https://i." + url.slice(7);
          console.log("Anime called: " + output);
          message.channel.send("", {
            file: output
          });
        })
    }
  }
