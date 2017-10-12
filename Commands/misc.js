// Not what you think
var fuckSounds = [
  { path: "./Files/Fuck.mp3" },
  { path: "./Files/Fuck2.mp3" },
  { path: "./Files/Fuck3.mp3"}
]

var discordPeople = [
  {
    name: "jeff",
    emoji: ":JChurch:"
  },

  {
    name: "bryan",
    emoji: ":BChurch:"
  },

  {
    name: "jake",
    emoji: ":SlickDickJake:"
  },

  {
    name: "jordan",
    emoji: ":JLit:"
  },

  {
    name: "brendan",
    emoji: ":CoolBrendan:"
  },

  {
    name: "sesh",
    emoji: ":sessions:"
  },

  {
    name: "owen",
    emoji: ":Owen:"
  },

  {
    name: "tyler",
    emoji: ":tyler:"
  },

  {
    name: "cole",
    emoji: ":cole:"
  },

  {
    name: "max",
    emoji: ":max:"
  },

  {
    name: "beeku",
    emoji: ":beeku:"
  },

  {
    name: "logan",
    emoji: ":logan:"
  },

  {
    name: "tayne",
    emoji: ":tayne:"
  },

  {
    name: "zito",
    emoji: ":zito:"
  },

  {
    name: "richard",
    emoji: ":richard:"
  },

  {
    name: "diego",
    emoji: ":Diego:"
  },

  {
    name: "nano",
    emoji: ":skele:"
  },

  {
    name: "grace",
    emoji: ":grace:"
  },

  {
    name: "miguel",
    emoji: ":miguel:"
  },

  {
    name: "hannah",
    emoji: ":hannah:"
  },

  {
    name: "son",
    emoji: ":son:"
  },

  {
    name: "emil",
    emoji: ":emil:"
  },

  {
    name: "ryan",
    emoji: ":ryan:"
  },

  {
    name: "lena",
    emoji: ":lena:"
  },

  {
    name: "kayla",
    emoji: ":kayla:"
  }
]

module.exports = {
  fuck: function(message) {
    var fuck = fuckSounds[Math.floor(Math.random() * fuckSounds.length)]
    console.log("Fuck called: " + fuck.path);
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join().then(connection => {
        if (connection.speaking) {
          message.channel.send("Audio already playing retard");
        } else {
          connection.playFile(fuck.path);
        }
      });
    }
  },

  jakarus: function(message, params) {
    console.log("jakarus called")
    if (params.length < 2) {
      message.channel.send(":freja:");
    } else {
      var person = searchEmoji(params[1]); // Find the emoji of the passed person
      if (person != undefined) {
        message.channel.send(person.emoji + "           :freja: \n" +
                             " \\\\|/     :gun: \\\\|/ \n" +
                             "   |                  | \n" +
                             " /\\               /\\");
        //message.channel.send(":freja: " + person.emoji);
      } else {
        message.channel.send("Who the fuck is " + params[1] + "?");
      }
    }
  }
}

function searchEmoji(name) {
  for (var i = 0; i < discordPeople.length; i++) {
    if (discordPeople[i].name == name.toLowerCase()) {
      return discordPeople[i];
    }
  }
}
