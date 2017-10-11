// Not what you think
var fuckSounds = [
  { path: "./Files/Fuck.mp3" },
  { path: "./Files/Fuck2.mp3" },
  { path: "./Files/Fuck3.mp3"}
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
  }
}
