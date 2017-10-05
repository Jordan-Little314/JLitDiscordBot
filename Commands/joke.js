// storing jokes in a variable jokes

var jokes = [
    { name: 'Dozen', answer: 'anybody want to let me in?' },
    { name: 'Avenue', answer: 'knocked on this door before?' },
    { name: 'Ice Cream', answer: 'if you don\'t let me in!' },
    { name: 'Adore', answer: 'is between us. Open up!' },
    { name: 'Lettuce', answer: 'in. Its cold out here!' },
    { name: 'Mikey', answer: 'doesnt fit through this keyhole' }
]

//choosing a random joke from the array

module.exports = {
  knock: function() {
      var joke = jokes[Math.floor(Math.random() * jokes.length)]
      return formatJoke(joke)
  }
}

//Formatting the output to return in a new line and plug in the output variables
function formatJoke(joke) {
    return [
        'Knock, knock.',
        'Who’s there?',
        joke.name + '.',
        joke.name + ' who?',
        joke.name + ' ' + joke.answer
    ].join('\n')
}
