// *******************************************************************************************
// DECK OF CARDS STEP ONE: DRAW A SINGLE CARD AND LOG THE VALUE AND SUIT

async function drawCard(url) {
  try {
    const res = await axios.get(url);
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// TOGGLE COMMENT ON/OFF FUNCTION CALL BELOW TO SEE/HIDE RESULT.

// drawCard("https://deckofcardsapi.com/api/deck/new/draw/?count=1");

// *******************************************************************************************
// DECK OF CARDS STEP TWO: GET CARD FROM NEWLY SHUFFLED DECK, GET ONE MORE CARD FROM SAME DECK, LOG BOTH VALUES AND SUITS

async function drawTwoCards() {
  try {
    let first = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
    );
    let deckId = first.data.deck_id;
    let second = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    console.log(
      `${first.data.cards[0].value} of ${first.data.cards[0].suit}` +
        " and " +
        `${second.data.cards[0].value} of ${second.data.cards[0].suit}`
    );
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// TOGGLE COMMENT ON/OFF FUNCTION CALL BELOW TO SEE/HIDE RESULT.

// drawTwoCards();

// *******************************************************************************************
// DECK OF CARDS STEP THREE: BUILD A PAGE THAT LETS YOU DRAW CARDS FROM A DECK AND DISPLAY THE CARD, UNTIL THE DECK RUNS OUT

// SELECT OUR PAGE ELEMENTS:
const userMessage = document.getElementById("user-message");
const userButton = document.getElementById("user-button");
const cardDisplay = document.getElementById("card-display");

// FUNCTION TO GET A NEW DECK:
async function getDeck(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (e) {
    console.log("ERROR!", e);
  }
}

// CREATE A NEW DECK AND AN OBJECT TO STORE THE DECK INFORMATION
let deck = {};

async function newDeck() {
  try {
    const res = await getDeck(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    deck.deckId = res.data.deck_id;
    deck.rem = res.data.remaining;
  } catch (e) {
    console.log("ERROR!", e);
  }
}

newDeck();

// HANDLE DRAWING FROM THE DECK, DISPLAYING THE CARDS, SHUFFLING, AND STARTING OVER
userButton.addEventListener("click", async (evt) => {
  if (deck.rem >= 1) {
    evt.preventDefault();
    userMessage.innerHTML = "Click the button to draw a card!";
    userButton.innerHTML = "Draw a Card";
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.deckId}/draw/?count=1`
    );
    cardDisplay.innerHTML = "";
    let img = document.createElement("img");
    img.src = res.data.cards[0].image;
    cardDisplay.appendChild(img);
    deck.rem = res.data.remaining;
    if (deck.rem == 0) {
      userMessage.innerHTML = "Click the button to shuffle and draw again!";
      userButton.innerHTML = "Start Over";
    }
  }
});
