/////////FORK

// ========================== creating class ==========================
class Character {
  constructor(name, type, gender, size) {
    this.name = name
    this.type = type // 1 street cat, 0 house cat
    this.gender = gender // 1 male, 0 female
    this.weight = size // 1 thin, 0 fat
    this.claw = 0
    this.meow = 0
    this.speed = 0
    this.setAttributes()
  }

  setAttributes() {
    if (this.type) {
      this.claw = getRandomBetween(6, 10);
    } else {
      this.claw = getRandomBetween(2, 8);
    }
    if (this.gender) {
      this.meow = getRandomBetween(6, 10, this.claw);
    } else {
      this.meow = getRandomBetween(2, 8, this.claw);
    }
    if (this.size) {
      this.speed = getRandomBetween(6, 10, this.claw, this.size);
    } else {
      this.speed = getRandomBetween(2, 8, this.claw, this.size);
    }
  }
}

// ============================= functions =============================

//returns a random number in a range set as parameter
function getRandomBetween(min, max, exception1 = -1, exception2 = - 1) {
  const minv = Math.ceil(min);
  const maxv = Math.floor(max);
  let random = Math.floor(Math.random() * (maxv - minv + 1)) + minv;

  if (random === exception1) {
    random++;
  } else if (random === exception2) {
    random++;
  }
  if (random === exception2) {
    random++;
  }
  if (random > max) {
    random = min;
  }
  return random;
}

//shuffles array using Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//hands cards to both playes one by one
function handCards(array) {

  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 1) {
      deckP1.push(deck[i]);
    } else {
      deckP2.push(deck[i]);
    }
  }
  return true;
}

//displays chosen attribute from object in array into tag by its id
function displayAttr(array, attr, displayId) {
  const display = document.getElementById(displayId);

  if (attr === 'name') {
    display.innerHTML = array[0].name;
  } else {
    switch (attr) {      
      case 'claw':
        display.innerHTML = array[0].claw;
        break;
      case 'meow':
        display.innerHTML = array[0].meow;
        break;
      case 'speed':
        display.innerHTML = array[0].speed;
        break;
    }
  }
}

//uses previous function to display player 1 current attributes
function displayP1cards() {
  displayAttr(deckP1, 'name', 'name-p1');
  displayAttr(deckP1, 'claw', 'claw-p1');
  displayAttr(deckP1, 'meow', 'meow-p1');
  displayAttr(deckP1, 'speed', 'speed-p1');
  return true;
}

//uses previous function to display player 2 current attributes
function displayP2cards() {
  displayAttr(deckP2, 'name', 'name-p2');
  displayAttr(deckP2, 'claw', 'claw-p2');
  displayAttr(deckP2, 'meow', 'meow-p2');
  displayAttr(deckP2, 'speed', 'speed-p2');
  return true;
}

//gets p1 chosen attribute by select's name, compares with p2 attribute 
function getAttrP1() {
  const checked = document.querySelector(`input[name="p1-attr"]:checked`).value;
  console.log(checked);
  switch (checked) {
    case 'claw':
      if (deckP1[0].claw > deckP2[0].claw) {
        console.log(`${deckP1[0].claw} > ${deckP2[0].claw} P1`);
        //move a carta 0 do p2 para o p1 &
        //passa a vez para o próximo jogador:
        moveCard(deckP2, deckP1);
        sendCardToBottom(deckP1);
      } else if (deckP2[0].claw > deckP1[0].claw) {
        console.log(`${deckP2[0].claw} > ${deckP1[0].claw} P2`);
        //move a carta 0 do p1 para o p2 &
        //passa a vez para o próximo jogador:
        moveCard(deckP1, deckP2);
        sendCardToBottom(deckP2);
      } else {
        console.log(`${deckP2[0].claw} = ${deckP1[0].claw} EVEN`);
        //move a carta para o monte
        //passa a vez para o próximo jogador
        if (p1turn) {
          moveCard(deckP1, pile);
          sendCardToBottom(deckP2);
        } else {
          moveCard(deckP2, pile);
          sendCardToBottom(deckP1);
        }
      }
      break;
    case 'meow':
      if (deckP1[0].meow > deckP2[0].meow) {
        console.log(`${deckP1[0].meow} > ${deckP2[0].meow} P1`);
        //move a carta 0 do p2 para o p1 &
        //passa a vez para o próximo jogador:
        moveCard(deckP2, deckP1);
        sendCardToBottom(deckP1);
      } else if (deckP2[0].meow > deckP1[0].meow) {
        console.log(`${deckP2[0].meow} > ${deckP1[0].meow} P2`);
        //move a carta 0 do p1 para o p2 &
        //passa a vez para o próximo jogador:
        moveCard(deckP1, deckP2);
        sendCardToBottom(deckP2);
      } else {
        console.log(`${deckP2[0].meow} = ${deckP1[0].meow} EVEN`);
        //move a carta para o monte
        //passa a vez para o próximo jogador
        if (p1turn) {
          moveCard(deckP1, pile);
          sendCardToBottom(deckP2);
        } else {
          moveCard(deckP2, pile);
          sendCardToBottom(deckP1);
        }
      }
      break;
    case 'speed':
      if (deckP1[0].speed > deckP2[0].speed) {
        console.log(`${deckP1[0].speed} > ${deckP2[0].speed} P1`);
        //move a carta 0 do p2 para o p1 &
        //passa a vez para o próximo jogador:
        moveCard(deckP2, deckP1);
        sendCardToBottom(deckP1);
      } else if (deckP2[0].speed > deckP1[0].speed) {
        console.log(`${deckP2[0].speed} > ${deckP1[0].speed} P2`);
        //move a carta 0 do p1 para o p2 &
        //passa a vez para o próximo jogador:
        moveCard(deckP1, deckP2);
        sendCardToBottom(deckP2);
      } else {
        console.log(`${deckP2[0].speed} = ${deckP1[0].speed} EVEN`);
        //move a carta para o monte
        //passa a vez para o próximo jogador
        if (p1turn) {
          moveCard(deckP1, pile);
          sendCardToBottom(deckP2);
        } else {
          moveCard(deckP2, pile);
          sendCardToBottom(deckP1);
        }
      }
      break;
  }
}

// pushes first element of an array to another one 
function moveCard(fromArr, toArr) {
  const movedCard = fromArr.splice(0, 1);
  toArr.push(movedCard[0]);
  p1turn = !p1turn;
  console.log(p1turn);
  return true;
}

// sends current card to the end of array too
function sendCardToBottom(arr) {
  const movedCard = arr.splice(0, 1);  
  arr.push(movedCard[0]);
  return true;
}

// set paw button animation behavior
function showClaws() {
  fightBtn.setAttribute('src', './assets/img/svg/claw.svg');
  
  const soundClaw = new Audio('/./assets/audio/claw2.mp3');
  soundClaw.volume = 0.4;
  soundClaw.play();

  setTimeout(() => {
    new Audio('/./assets/audio/hissing2.mp3').play();
  }, 200);

  setTimeout(() => {
    fightBtn.setAttribute('src', './assets/img/svg/paw.svg');
  }, 1200);
}


// ====================== literals & variables ======================

const deck = []; // array to store all game cards
const deckP1 = []; // array to store each
const deckP2 = []; // player's set of cards
let p1turn = true; // defines wether it's player 1 turn or not
const pile = []; // array to store cards when turn output is even

// ========================== DOM elements ==========================

const cardP1 = document.getElementById('card-p1');
cardP1.addEventListener('click', displayP1cards);
const cardP2 = document.getElementById('card-p2');
cardP2.addEventListener('click', displayP2cards);
const fightBtn = document.getElementById('fight-btn');
fightBtn.addEventListener('click', getAttrP1);
fightBtn.addEventListener('click', showClaws);

// =========================== characters =========================== [BETA VERSION]
//constructor(name, type, gender, size)

deck.push(new Character('Bissinho', 0, 1, 1));
deck.push(new Character('Minuc', 0, 0, 1));
deck.push(new Character('Piju', 1, 0, 0));
deck.push(new Character('Massinho', 0, 1, 0));
deck.push(new Character('Django', 0, 1, 0));
deck.push(new Character('Feminha', 0, 0, 1));
deck.push(new Character('Katrina', 0, 0, 1));
deck.push(new Character('Alfa', 1, 1, 1));

// ====================== execution ======================

shuffle(deck);
handCards(deck);