const rl = require('readline-sync')

const cardMap = { 1: 'A', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9:'9', 10: '10', 11: 'J', 12: 'Q', 13: 'K'}
const suitMap = { 1: 'Diamonds', 2: 'Clubs', 3: 'Hearts', 4: 'Spades' }


// The product team is impressed with your product and takes it to market for initial validation. They return with a list of revisions they would like to make:

// They would like more than 4 players in the game.
// All players who draw the card must now show the card.
// Subsequent players are allowed to skip the round.
// There are now two decks of playing cards available per game

// How would you update your implementation to accommodate these features?

function game () {

  const playerNum = Number(rl.question('Welcome to the game! what is the number of players?'))

  if (typeof playerNum !== 'number' || playerNum < 4) {
    return console.log('Not enough players!')
  }

  let scoreboard = {}

  // create scoreboard
  for (let i=1; i<playerNum +1; i++) {
    scoreboard[String(i)] = 0
  }

  // create a deck
  let deck = createDeck()

  // round
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

function createDeck() {

  let card = 1
  let suit = 1
  let deck = []

  while (card < 14 && suit < 5) {
    deck.push({ card: cardMap[card], value: card, suit: suitMap[suit], suitValue: suit })
    if (card >= 13) {
      card = 1
      suit ++
    } else {
      card ++
    }
  }

  card = 1
  suit = 1

  while (card < 14 && suit < 5) {
    deck.push({ card: cardMap[card], value: card, suit: suitMap[suit], suitValue: suit })
    if (card >= 13) {
      card = 1
      suit ++
    } else {
      card ++
    }
  }

  return deck
}

function shuffleDeck(deck) {
  deck = deck.sort(function compareFn() {
    return Math.random() - 0.5
  })

  return deck
}

function draw(deck, scoreboard, playerCount) {

  let gameList = []

  // assuming 4 players
  for (let i = 1; i < playerCount + 1; i++) {

    // choose to draw card?
    const drawCard = rl.question(`Will player ${i} draw a card? (y/n)`)

    if (drawCard.toLowerCase() === 'y') {
      // adds card to player
      gameList.push({ player: i, ...deck[0]})

      // removes the card from deck
      deck.shift()

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

// let scoreboard = { 1: 0, 2: 0, 3: 0, 4: 0 }
function findWinner (scoreboard) {
  var scoreList = Object.keys(scoreboard).map((key) => [key, scoreboard[key]])
  const winnerList = scoreList.sort(function (a,b) {
    return b[1] - a[1]
  })

  return winnerList
}

game()




