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

//function fur karten shuffling/Mischen
// Paramter Array: ersetzt später die Emoji array von generateGame()
const shuffle = array => {
  const clonedArray = [...array] //ein brücke zwischen die Emoji array und der logik diese funtkion

  // schleife, geht in runden um alle emojis finden
  for (let index = clonedArray - 1; index > 0; index--) {

    // jede runde erzeugt die schleife ein zufällige nummer, den wir weiter an die originale position die Emojis weiter geben sollen
    const randomIndex = Math.floor(Math.random() * (index + 1));

    const original = clonedArray[index]; //index die die originale position jede emoji kennt, speichert sich in ein variable

    //original, wird an randomIndex zugewiesen und auch der index position, wird gelich zu randomIndex, damit wir die zufällige nummer an die originale position geben können
    clonedArray[index] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }
  return clonedArray; //catch der ende positionierung reihen nummer zu dem emojis
}

//function fur random auswahl von emojis/bilder die in die karten sortiert sollen
const pickRandom = (array, item) => {
  const clonedArray = [...array];
  // diese array bekommt random zahlen, die danach an clonedArray geleitet wird
  const randomPicks = [];

  // diese Schleife verwendet als beginn und ende zahl der index und item, wobei index bei 0 beginnt und die Schleife bricht, sobald index ist gleich der zahl der item paramter, in der zukunft von uns bekommen würde als menge von emojis in der spiel
  for (let index = 0; index < item; index++) {

    const randomIndex = Math.floor(Math.random() * (clonedArray.length)); //mit randomIndex bekommen wir ein random nummer von sitzt position die emojis in der emojis array

    randomPicks.push(clonedArray[randomIndex]); //pack der zufälligen nummer in der leeren array von oben
    clonedArray.splice(randomIndex, 1); // statt der erste nummer zu ersetzten, füge der neue einfach darunter
  }
  return randomPicks; //holt der komplette random emojis position bevor der wert einfach entsorgt wird
}

//function um die karten + die emojis drin generieren
const generateGame = () => {
//  emojis die in die karte geladen werden
  const emojis = ['🫥', '👾', '🥷🏼', '🧜🏼‍♂️', '🪸', '🌊', '🥐', '🍜', '🎮', '🛰️'];
  const picks = pickRandom(emojis, 4);
  const item = shuffle([...picks, ...picks]);

//  karte körper mit javascript einspeisen und mit emojis fühlen
  const cards = `
        <div class="board" style="grid-template-columns: repeat(2, auto)">
            ${item.map(item => `
                <div class="card">
                    <div class="card-front">${item}</div>
                    <div class="card-back"></div>
                </div>
            `).join('')}
       </div>
    `
  const parser = new DOMParser().parseFromString(cards, 'text/html');

  gameVariables.board.replaceWith(parser.querySelector('.board'));
}

//Hier wird die zeit funktion geschrieben mit die veranschtaltung die der zeit auslösst und in der Text feld von timer, der in gameVariables tabelle geschrieben ist.
const startGame = () => {
  stats.gameStarted = true;
  gameVariables.start.classList.add("disabled");

  gameVariables.start.disabled = true; /*knopf ausschalten, nachdem sie einaml richtig die funktion startGame starten lässt*/

  //schleife von Zeit um der Zeit in die seite darstellen
  stats.loop = setInterval(() => {
    stats.totalTime++ /*ein nummer extra jede volle runde*/
    // console.error(stats.totalTime);

    gameVariables.timer.innerText = `time: ${stats.totalTime} sec`
  }, 1000)
};

gameVariables.start.addEventListener("click", () => {
  startGame();
});

//function um karten zu flippen
const flipCard = card => {
  stats.flippedCards++; //wird verwendet um die karten zu vergleichen und nur 2 karten pro runde öffnen lassen
  stats.totalFlips++; //gesammten anzahl von flips versuche der am ende der spiel gezeigt wird
  
  if(!stats.gameStarted){ //Anti Cheat
    startGame();
  }
}

//function um karten flip status zurücksetzten
// bei diese Funktion, werden nachdem alle karten erzeugt sind alle die karten die geflipped sind untersucht, wenn sie einandere nicht matchen, dann bekommen sind die klasse von flipped entfernt, welche verantwortlich ist um das teil umzudrehen.
const flipBackCard = () =>{
  document.querySelectorAll('.card:not(.matched)').forEach(card =>{
    card.classList.remove('flipped');
  });
  stats.flippedCards = 0; //diese tabelle reihe, wird genullt um weiter versuche zu machen
}

//function die entdeckt, wenn kein Karten mehr übrig bedeutet das, das die spiel, zu ende Ist!!!

generateGame();
