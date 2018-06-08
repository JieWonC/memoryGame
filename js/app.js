let card = document.getElementsByClassName('card');
let cards = [...card];
let openedCards = [];
const deck = document.querySelector('.deck');
const matchedCard = document.getElementsByClassName('match');
let moves = 0;
let gameTimer;
const timer = document.querySelector('.timer');
const counter = document.querySelector('.moves');
const scoreStars = document.querySelectorAll('.fa-star')
const restart = document.querySelector('.restart');
const gameResult = document.getElementById('game-result');
const span = document.getElementsByClassName('close')[0];
const playAgain = document.getElementById('play-again');

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

// Initial Game Setting
function startGame() {
    cards = shuffle(cards);
    deck.innerHTML = '';
    cards.forEach(function (card) {
        deck.appendChild(card);
        card.classList.remove('show', 'open', 'match', 'disable');
    });

    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < scoreStars.length; i++){
        scoreStars[i].style.visibility = 'visible';
    }
    second = 0;
    clearInterval(gameTimer);
    timer.innerHTML = '0 sec(s)';
    clickCardEvent();
}

window.onload = startGame();

// When user clicked a card...
function clickCardEvent() {
    cards.forEach(function (card) {
        card.addEventListener('click', clickCard);
        card.addEventListener('click', matching);
        card.addEventListener('click', gameResultModal);
    });
}

// Action a card clicked
function clickCard() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
}

// Compare two cards : openedCards[0] & openedCards[1]
function matching() {
    openedCards.push(this);
    let length = openedCards.length;
    if (length === 2) {
        moveCounter();
        if (openedCards[0].querySelector('i').classList.value
        === openedCards[1].querySelector('i').classList.value) {
            matched();
        } else {
            unmatched();
        }
    }
}

// for when cards : matched
function matched() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    openedCards[0].classList.add('show', 'open');
    openedCards[1].classList.add('show', 'open');
    openedCards = [];
}

// for when cards : unmatched
function unmatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        openedCards = [];
    }, 750);
}

// disable cards shortly
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

// enable cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add('disabled')
        }
    });
}

// move counter & rating
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
        second = 0;
        startTimer();
    }
    if (moves > 10 && moves < 16) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                scoreStars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves > 17) {
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                scoreStars[i].style.visibility = 'collapse';
            }
        }
    }
}

// Timer: start with clicking card and stop with all cards matched
function startTimer() {
    gameTimer = setInterval(function() {
        timer.innerHTML = second + ' secs';
        second++;
    }, 1000);
}

function stopTimer() {
    clearInterval(gameTimer);
}

// Reset Game: restart, and play again btn, close modal btn on the game result modal
function resetGame() {
    location.reload();
}
restart.addEventListener('click', resetGame);

// Game Result Modal
function gameResultModal() {
    if (matchedCard.length === 16) {
        clearInterval(gameTimer);
        finalTime = timer.innerHTML;

        gameResult.style.display = "block";

        let starRating = document.querySelector('.stars').innerHTML;

        document.getElementById('star-rating').innerHTML = starRating;
        document.getElementById('final-moves').innerHTML = moves;
        document.getElementById('final-time').innerHTML = finalTime;
    }
}


// Close Game Result (Modal)
span.onclick = function() {
    resetGame();
    gameResult.style.display = 'none';
}

// Play Again Button
playAgain.onclick = function (event) {
    resetGame();
    gameResult.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == gameResult) {
        resetGame();
        gameResult.style.display = 'none';
    }
}
// Get the modal
// var btn = document.getElementById("myBtn");
// btn.onclick = function() {
// gameResult.style.display = "block";
// }
