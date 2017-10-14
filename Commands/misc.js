// Not what you think
var fuckSounds = [
  { path: "./Files/Fuck.mp3" },
  { path: "./Files/Fuck2.mp3" },
  { path: "./Files/Fuck3.mp3"}
]

var discordPeople = [
  {
    name: "jeff",
    emoji: "<:JChurch:245026382101479436>"
  },

  {
    name: "bryan",
    emoji: "<:BChurch:245028264492531712>"
  },

  {
    name: "jake",
    emoji: "<:SlickDickJake:245029849121554432>"
  },

  {
    name: "jordan",
    emoji: "<:JLit:245030581866463233>"
  },

  {
    name: "brendan",
    emoji: "<:CoolBrendan:245084112929423360>"
  },

  {
    name: "sesh",
    emoji: "<:sessions:245280851833782272>"
  },

  {
    name: "owen",
    emoji: "<:Owen:245428859665776641>"
  },

  {
    name: "tyler",
    emoji: "<:tyler:245597314192900096>"
  },

  {
    name: "cole",
    emoji: "<:cole:247604223649251329>"
  },

  {
    name: "max",
    emoji: "<:max:247605417415278602>"
  },

  {
    name: "beeku",
    emoji: "<:beeku:247605690980368384>"
  },

  {
    name: "logan",
    emoji: "<:logan:247605923881680896>"
  },

  {
    name: "tayne",
    emoji: "<:tayne:247606316267208704>"
  },

  {
    name: "zito",
    emoji: "<:zito:247606438896074752>"
  },

  {
    name: "richard",
    emoji: "<:richard:247609240716312576>"
  },

  {
    name: "diego",
    emoji: "<:Diego:249065499764326400>"
  },

  {
    name: "nano",
    emoji: "<:skele:310216548210049034>"
  },

  {
    name: "grace",
    emoji: "<:grace:319254275043885068>"
  },

  {
    name: "miguel",
    emoji: "<:miguel:320028190619992074>"
  },

  {
    name: "hannah",
    emoji: "<:hannah:320066982672334848>"
  },

  {
    name: "son",
    emoji: "<:son:320371173181620224>"
  },

  {
    name: "emil",
    emoji: "<:emil:320371205674762241>"
  },

  {
    name: "ryan",
    emoji: "<:ryan:322176790070296576>"
  },

  {
    name: "lena",
    emoji: "<:lena:347922138096992267>"
  },

  {
    name: "kayla",
    emoji: "<:kayla:360623357210656769>"
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
    } else {
      message.channel.send("Get in an audio channel dumbass");
    }
  },

  dracarys: function(message, params) {
    console.log("dracarys called")
    if (params.length < 2) {
      message.channel.send("<:freja:291712863700254742>");
    } else {
      var person = searchEmoji(params[1]); // Find the emoji of the passed person
      if (person != undefined) {
        message.channel.send(person.emoji + "           <:freja:291712863700254742> \n" +
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
