const gameVariables = {
  timer: document.querySelector(".timer"),
  moves: document.querySelector(".moves"),
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  win: document.querySelector(".win"),
  start: document.querySelector("button")
}

const stats = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
}

//Hier wird die zeit funktion geschrieben mit die veranschtaltung die der zeit auslösst und in der Text feld von timer, der in gameVariables tabelle geschrieben ist.
const startGame = () => {
  stats.gameStarted = true;
  gameVariables.start.classList.add("disabled");
};

gameVariables.start.addEventListener("click", ()=>{
  startGame();
});
