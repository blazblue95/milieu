const rl = require('readline-sync')

const cardMap = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9:'9', 10: '10', 11: 'J', 12: 'Q', 13: 'K'}
const suitMap = { 1: 'Diamonds', 2: 'Clubs', 3: 'Hearts', 4: 'Spades' }


// highest card value game
function game () {

  const playerNum = Number(rl.question('Welcome to the game! what is the number of players?'))

  // if invalid character or number < 4 is entered, game will close.
  if (typeof playerNum !== 'number' || playerNum < 4) {
    return console.log('Not enough players!')
  }

  // create scoreboard
  let scoreboard = {}
  for (let i=1; i<playerNum +1; i++) {
    scoreboard[String(i)] = 0
  }

  // create a deck
  let deck = createDeck()

  // initialise round
  let round = 1

 // check if cards left in the dec
  while (deck.length >= playerNum) {
    
    // shuffle
    deck = shuffleDeck(deck)
    console.log(`deck shuffled and round ${round} is starting...`)

    // allow player to take card, and take card out of deck
    // compare the score using sort
    // add a point to the player which wins the round

    deck, scoreboard = draw(deck, scoreboard, playerNum)
    console.log('Current scoreboard: ', JSON.stringify(scoreboard))
    round ++
  }

  let winnerList = findWinner(scoreboard)

  console.log('The scoreboard is ', winnerList)
  console.log('The winner is ', winnerList[0])
}

// createDeck will use forloops to create an array of 2 decks of cards
function createDeck() {

  let card = 1
  let suit = 1
  let deckNo = 1
  let deck = []

  // 13 cards per suit, 4 suits and 2 decks
  while (card < 14 && suit < 5 && deckNo < 3) {
    console.log({ card: cardMap[card], value: card, suit: suitMap[suit], suitValue: suit })
    deck.push({ card: cardMap[card], value: card, suit: suitMap[suit], suitValue: suit })
    if (card >= 13) {
      if (suit >= 4) {
        suit = 1
        deckNo ++
      } else {
        suit ++
      }
      card = 1
    } else {
      card ++
    }
  }

  return deck
}

// shuffleDeck shuffles the inputted deck of cards
function shuffleDeck(deck) {
  deck = deck.sort(function compareFn() {
    return Math.random() - 0.5
  })

  return deck
}

// draw provides the main game logic for each round
function draw(deck, scoreboard, playerCount) {

  // initialize game list
  let gameList = []

  // loop according to the number of players
  for (let i = 1; i < playerCount + 1; i++) {

    // choose to draw card?
    const drawCard = rl.question(`Will player ${i} draw a card? (y/n)`)

    if (drawCard.toLowerCase() === 'y') {
      // adds card to player
      gameList.push({ player: i, ...deck[0]})

      // removes the card from deck
      deck.shift()

      // stdout to notify each player's action
      console.log(`Player ${i} has drawn a card`)
      console.log('Player card is ', { player: i, ...deck[0]})
    } else {
      console.log(`Player ${i} has skipped the round!`)
    }
  }

  // gamelist contains all players with cards
  let winningList = gameList.sort(function (a,b) {
    if (a.value === b.value) {
      return b.suitValue - a.suitValue
    } else {
      return b.value - a.value
    }
  })

  console.log('Round results: ', winningList)

  // add one point to player which won the round
  scoreboard[winningList[0].player] ++

  return deck, scoreboard
}

// find winner will output the ordered list from player with highest score to player with the lowest score
function findWinner (scoreboard) {
  var scoreList = Object.keys(scoreboard).map((key) => [key, scoreboard[key]])
  const winnerList = scoreList.sort(function (a,b) {
    return b[1] - a[1]
  })

  return winnerList
}

// function to call game
game()




