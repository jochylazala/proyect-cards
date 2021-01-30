class Cards {
  static createCards(cardsZise) {
    var html = '';
    var dom = document.getElementById('cards-images');

    for (var i = 0; i < cardsZise; i++) {
      var random = Math.floor((Math.random() * cardsZise) + 1);

      html += `<div class="blocks">
        <div class="content-block"  data-clicked="0" data-cards="${random}" ${random} dacontentta-enc="0" id="${random}" >
          <img src="cards/${random}.gif"/>
        </div> 
      </div>`;
    }
    dom.innerHTML = html;
  }
}

class Main {
  start() {
    Cards.createCards(52);
  }
}

var casino = new Main();
casino.start();

//class for the players
class Players {
  constructor(firstplayer, secondplayer) {
    this.firstplayer = firstplayer;
    this.secondplayer = secondplayer;
  }
}
const playerone = prompt("Type the first name");
const playertwo = prompt("Type the second name");
const players = new Players(playerone, playertwo)
document.getElementById("playerone").innerHTML = players.firstplayer;
document.getElementById("playertwo").innerHTML = players.secondplayer;
//array to store the players
const playing = document.getElementById("playing");
const turn = [];
turn[0] = players.firstplayer;
turn[1] = players.secondplayer;
let whoseTurn = 0;
playing.innerHTML = "Playing: " + turn[whoseTurn];
playing.addEventListener('click', () => {
  if (whoseTurn == 0) {
    whoseTurn = 1;
    playing.innerHTML = "Playing: " + turn[whoseTurn];
  } else if (whoseTurn == 1) {
    whoseTurn = 0;
    playing.innerHTML = "Playing: " + turn[whoseTurn];
  }
})

const cards = document.getElementsByClassName("blocks");
console.log(cards.length)
let firstcard;
let seconcard;
const points = document.querySelectorAll("div.score");
const pointCard = document.querySelectorAll("div.pointCard");

class Elements {
  constructor(id_ant, clickcard, isPoint, score, scoreone, scoretwo, isCard, cardsPoints, scoreCards_one, scoreCards_two) {
    this.id_ant = id_ant;
    this.clickcard = clickcard;
    this.isPoint = isPoint;
    this.score = score;
    this.scoreone = scoreone;
    this.scoretwo = scoretwo;
    this.isCard = isCard;
    this.cardsPoints = cardsPoints;
    this.scoreCards_one = scoreCards_one;
    this.scoreCards_two = scoreCards_two;

  }
}

var elements = new Elements(0, false, false, 0, 0, 0, false, 0, 0, 0)
//function for the effect of flip for all the cards 
function flip_effect() {
  let element = this.getElementsByClassName("content-block")[0];
  if (element.id != elements.id_ant) {
    element.dataset.clicked = "1";
    element.style.transform = "rotateY(0deg)";
    if (!elements.clickcard) {
      elements.clickcard = true;
      moveFirst = this;
      //option to convert to an integer the value that I get from the dataset.card for the first card
      firstcard = parseInt(element.dataset.cards);
    } else {
      elements.clickcard = false;
      moveSecond = this;
      //option to convert to an integer the value that I get from the dataset.card for the second card
      seconcard = parseInt(element.dataset.cards);
    };
    //function to give the position of the card when both cards are pair 
    function positions() {
      moveFirst.style.left = "80%";
      moveFirst.style.top = "40%";
      moveSecond.style.left = "80%";
      moveSecond.style.top = "40%";
    }

    var RestuldOfCard = Math.abs(firstcard - seconcard)
    if (RestuldOfCard == 13 || RestuldOfCard == 26 || RestuldOfCard == 39) {
      positions()
      elements.cardsPoints += 2;
      elements.isCard = true;
    }
    if (firstcard == 14 && seconcard == 27) {
      elements.score += 2;
      elements.isPoint = true;
    } else if (firstcard == 14 && seconcard == 40 || firstcard == 40 && seconcard == 14) {
      elements.score += 2;
      elements.isPoint = true;
    } else if (firstcard == 27 && seconcard == 40 || firstcard == 40 && seconcard == 27) {
      elements.score += 2;
      elements.isPoint = true;
    }
    if (firstcard == 41 && seconcard == 2 || firstcard == 2 && seconcard == 41 || firstcard == 41 && seconcard == 15 || firstcard == 15 && seconcard == 41 /* || firstcard 41 && seconcard == 28 || firstcard == 28 && seconcard == 41*/ ) {
      elements.score += 2;
      elements.isPoint = true;
    } else if (firstcard == 23 && seconcard == 10 || firstcard == 10 && seconcard == 23 || firstcard == 23 && seconcard == 36 || firstcard == 36 && seconcard == 23 /* || firstcard == 23 && seconcard == 49 || firstcard == 49 && seconcard == 23*/ ) {
      elements.score += 2;
      elements.isPoint = true;
    } else if (firstcard == 23 && seconcard == 49 || firstcard == 49 && seconcard == 23) {
      elements.score += 2;
      elements.isPoint = true;
    } else if (firstcard == 41 && seconcard == 28 || firstcard == 28 && seconcard == 41) {
      elements.score += 2;
      elements.isPoint = true;

    }
  }
  //blocks of code (if) to assign the points and the amount of cards for each players    
  if (elements.isPoint && whoseTurn == 0 || elements.isCard && whoseTurn == 0) {
    elements.scoreone += elements.score;
    points[whoseTurn].innerHTML = "Score: " + elements.scoreone;
    elements.isPoint = false;
    elements.score = 0;
    elements.scoreCards_one += elements.cardsPoints;
    pointCard[whoseTurn].innerHTML = "Cards: " + elements.scoreCards_one;
    elements.isCard = false;
    elements.cardsPoints = 0;
  } else if (elements.isPoint && whoseTurn == 1 || elements.isCard && whoseTurn == 1) {
    elements.scoretwo += elements.score;
    points[whoseTurn].innerHTML = "Score: " + elements.scoretwo;
    elements.isPoint = false;
    elements.score = 0;
    elements.scoreCards_two += elements.cardsPoints;
    pointCard[whoseTurn].innerHTML = "Cards: " + elements.scoreCards_two;
    isCard = false;
    elements.cardsPoints = 0;
  }

}
//assign 3 points to the player with more cards 
check = document.getElementById("check");
check.addEventListener('click', () => {
  if (elements.scoreCards_one > elements.scoreCards_two) {
    elements.scoreCards_one = elements.scoreCards_one += 3;
    pointCard[whoseTurn].innerHTML = "Cards: " + elements.scoreCards_one;
  } else if (elements.scoreCards_two > elements.scoreCards_one) {
    elements.scoreCards_two = elements.scoreCards_two += 3;
    pointCard[whoseTurn].innerHTML = "Cards: " + elements.scoreCards_two
  }
})
//functions to move the cards with the mouse 
var images;
var moving = false;

function move(e) {
  var newX = e.clientX - 10;
  var newY = e.clientY - 10;
  image.style.left = newX + "px";
  image.style.top = newY + "px";
}

function initialClick(e) {
  if (moving) {
    document.removeEventListener("mousedown", move);
    moving = !moving;
    return;
  }
  moving = !moving;
  image = this;
  document.addEventListener("mousemove", move, false);
}

function moveUp() {
  document.removeEventListener("mousemove", move);
}
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flip_effect, false);
  cards[i].addEventListener("mousedown", initialClick, false)
  cards[i].addEventListener("mouseup", moveUp, false);
};

//variable to count the amount of the clicks 
let clicks = 0;
const button = document.querySelector('#button');
//variable to conver the object cards to 1 array 
let new_cards = Array.prototype.slice.call(cards);
var amount_card = 0;
class Values {
  constructor(x, y, space) {
    this.x = x;
    this.y = y;
    this.space = space;
  }
}
const value = new Values(300, 100, 67)
//function to call the functions to deal the cards 
function deals(amount_card) {
  value.y = 100;
  for (var i = 1; i <= amount_card; i++) {
    new_cards[i].style.top = `${value.y}px`;
    new_cards[i].style.left = `${value.x}px`;
    value.x += value.space;
    if (i % 4 === 0) {
      value.y += 200;
      value.x = 300;
    }
  }
  //option to delete from the array the cards that have been dealt
  new_cards.splice(0, amount_card);
}

function dealCards() {
  clicks++
  if (clicks == 1) {
    amount_card = 12;
    deals(12)
  } else if (clicks >= 2) {
    amount_card = 8;
    deals(8)
  }
}
button.addEventListener('click', () => {
  dealCards();
});