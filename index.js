let player = {
    name : "Anon",
    chips : 100
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let startEl = document.getElementById("start-el")
let standEl = document.getElementById("stand-el")
let bankEl = document.getElementById("bank-el")
let newEl = document.getElementById("new-el")
playerEl.textContent = player.name + ", $" +player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 1
    } else {
        return randomNumber
    }
}

function startGame() {
    if (!isAlive ) {
        cards = []
        sum = 0
        hasBlackJack = false
        bankEl.textContent = ""
    }
    if (cards.length === 0 ) {
        isAlive = true
        // Generate two random numbers
        // Re-assign the cards and sum variables so that the game can start
        cards.push(getRandomCard())
        cards.push(getRandomCard())
        calculateSum() // Calculate the sum after the initial cards
        renderGame()
        startEl.textContent = "START GAME"
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum

    if ( player.chips < 8 ){
        newEl.style.display = "none"
        startEl.style.display = "none"
        message = "You are too broke to continue, please stop gambling !"
    } else {
        if (sum <= 20) {
            message = "Do you want to draw a new card?"
            standEl.style.display = "inline-block"
        } else if (sum === 21) {
            message = "You've got Blackjack!"
            hasBlackJack = true
            player.chips += 10
            playerEl.textContent = player.name + ", $" +player.chips
            isAlive = false
            startEl.textContent = "PLAY AGAIN"
            standEl.style.display = "none"
        } else {
            message = "You're out of the game!"
            isAlive = false
            startEl.textContent = "PLAY AGAIN"
            standEl.style.display = "none"
            player.chips -= 8
            playerEl.textContent = player.name + ", $" +player.chips
        }
    }

    messageEl.textContent = message

}


function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        cards.push(card)
        calculateSum() // Recalculate the sum every time a new card is added
        standEl.style.display = "inline-block"
        renderGame()
    }
}

// Function to calculate the sum and adjust ace values dynamically
function calculateSum() {
    sum = 0
    let aceCount = 0
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i]
        if (cards[i] === 1) aceCount++
    }

    // Adjust ace values to be 11 if possible (without busting)
    for (let i = 0; i < aceCount; i++) {
        if (sum + 10 <= 21) {
            sum += 10 // Convert one Ace from 1 to 11
        }
    }
}

function compareHand() {
    let bank = Math.floor(Math.random() * 13) + 17;
    if (bank >= sum && bank <= 21) {
        messageEl.textContent = "Better Luck Next time !"
        bankEl.textContent = "The Bank got: " + bank + "!"
        standEl.style.display = "none"
        player.chips -= 8
        playerEl.textContent = player.name + ", $" +player.chips
        isAlive = false
        return bank
    } else if (bank < sum || bank > 21 ) {
        messageEl.textContent = "Winner, Winner!"
        bankEl.textContent = "The Bank got: " + bank + "!"
        standEl.style.display = "none"
        player.chips += 5
        playerEl.textContent = player.name + ", $" +player.chips
        isAlive = false
        return bank
    }

}
