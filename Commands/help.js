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
               "-cat: random cat picture, taken from /r/catpictures\n" +
               "-puppy: random puppy picture, taken from /r/puppies\n" +
               "-fuck: for when you need to yell but can't\n" +
               "-jakarus <name>: Freja attacks\n" +
               "```"
