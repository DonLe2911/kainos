var MatchGame = {};
var attempts = 0;
var flippedCount = 0;
var count=0;
var x;

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
   'Andreea Irimia, University of Birmingham, Placement year student',
   'Pedro Mendonca, University of Nottingham, Graduate',
   'Thomas Seelig, Birmingham City University, Placement year student',
   'Jimmie Sundberg, University of Leicester, Graduate',
   'Patrick Blakey, University of Warwick, Graduate',
   'Ravinder Pal Singh, University of Birmingham, Placement year student',
   'Marc-Steeven Eyeni-Kantsey, University of Birmingham, Graduate',
   'Rhys Barrett, University of Birmingham, Placement year student' ];


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
  if(count == 0)
    startTimer();
});
};

function startTimer(){
x=setTimeout("startTimer()",1000);
count=count+1;
document.getElementById("timera").innerHTML = count;
}

function stoptimer(){
clearTimeout(x);
}

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  attempts++;
  if(attempts % 2 == 0)
    document.getElementById('attempts').innerHTML = attempts/2;
  $card.css('background-image', $card.data('image'))
      .data('isFlipped', true);
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  if (flippedCards.length === 2) {
    flippedCount++;
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      console.log(flippedCards[1].data('value'));
      $('#bios').html('<h1>Biography</h1><p>' + flippedCards[1].data('bio') + '</p>');
      var matchCss = {
        backgroundColor: 'rgba(153, 153, 153, .6)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss).addClass('match');
      flippedCards[1].css(matchCss).addClass('match');

        if ($(".match").length / 2 == bios.length) {
            window.alert("YOU'VE WON!\n\n" + "Time: " + count + "\n\nAttempts: " + attempts/2);
            stoptimer();
        }
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
