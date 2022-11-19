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
