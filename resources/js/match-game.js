var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
 var numbers = [];

 for (var i = 1; i <= 8; i++) {
   numbers.push(i);
   numbers.push(i);
 }

var cards = [];

while (numbers.length > 0) {
  var randomIndex = Math.floor(Math.random() * numbers.length);
  var randomNumber = numbers.splice(randomIndex, 1)[0];
  cards.push(randomNumber);
}

return cards;

};




/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
