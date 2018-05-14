var MatchGame = {};
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
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
MatchGame.renderCards = function(cards, $game) {
  var images = [
    'url(\'resources/images/Andreea.jpg\')',
    'url(\'resources/images/Pedro.jpg\')',
    'url(\'resources/images/Thomas.jpg\')',
    'url(\'resources/images/Jimmie.jpg\')',
    'url(\'resources/images/Patrick.jpg\')',
    'url(\'resources/images/Ravinder.jpg\')',
    'url(\'resources/images/Marc.jpg\')',
    'url(\'resources/images/Rhys.jpg\')'];
 var bios = [
   'Andrea',
   'Pedro',
   'Thomas',
   'Kainos',
   'Kainos',
   'Kainos',
   'Kainos',
   'Kainos'
 ];

    $game.empty();
    $game.data('flippedCards', []);
  for (var j = 0; j < cards.length; j++) {
    var value = cards[j];
    var image = images[value - 1];
    var bio = bios[value-1];
    var data = {
      value: value,
      image: image,
      bio: bio,
      isFlipped: false
  };
  var $cardElement = $('<div class="col-xs-3 card" data-bio="' + data.bio +'"></div>');

  $cardElement.data(data);
  $game.append($cardElement);
}
$('.card').click(function() {
  MatchGame.flipCard($(this), $('#game'));
});
};
/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  $card.css('background-image', $card.data('image'))
      .data('isFlipped', true);
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      console.log(flippedCards[1].data('value'));
      console.log(flippedCards[1].data('bio'));
      var matchCss = {
        backgroundColor: 'rgba(153, 153, 153, .6)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss).addClass('match');
      flippedCards[1].css(matchCss).addClass('match');
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      var css = {
            backgroundImage: 'none'
      }
      window.setTimeout(function() {
        card1.css(css)
            .data('isFlipped', false);
        card2.css(css)
            .data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};
