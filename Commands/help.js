module.exports = {
  help: function() {
      return helpText
  }
}

var helpText = "```Welcome to the Lit Bot! \n" +
               "Current commands are as follows: \n" +
               "-joke: tells a knock knock joke \n" +
               "-thinking: random thinking emoji \n" +
               "-music <q> <URL>: puts a song in the queue\n" +
               "-music <play/stop>: plays/stops song in queue\n" +
               "```"
