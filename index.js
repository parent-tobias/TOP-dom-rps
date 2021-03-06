const options = ['rock','paper','scissors'];
const gameStats = {
  scores: {
    player: 0,
    computer: 0
  },
  rounds: []
}
const gameEls = {
  introContainer: document.querySelector(".intro-screen"),
  gameContainer: document.querySelector(".game-container"),
  resultsPane: document.querySelector(".game-container .results-pane"),
  playerPane: document.querySelector(".game-container .player-pane"),
  scoresPane: document.querySelector(".game-container .score-pane")
}

const playerPlay = () => {
  let selection="";
  while(!options.includes(selection.toLowerCase())){
    selection = prompt("Rock, Paper or Scissors", "rock")
  }
  return selection;
}
const computerPlay = () => {
  return options[Math.floor(Math.random()*options.length)]
}
const whoWon = (player, computer) =>{
  // the ties, we handle right off.
  if(player==computer) return 0;
  switch(player){
    case "rock":
      if(computer=="paper") return -1;
      return 1;
    case "paper":
      if(computer=="scissors") return -1;
      return 1;
    case "scissors":
      if(computer=="rock") return -1;
      return 1;
  }
}

const playRound = (event) => {
  const playerSelection = event.target.value;
  const computerSelection = computerPlay();
  const wonThisRound = whoWon(playerSelection, computerSelection );
  console.log(wonThisRound)
  let result;

  switch(wonThisRound){
    case 0:
      result = {
        message: `It's a tie: ${playerSelection} and ${computerSelection}`,
        player: 0,
        computer: 0
      };
      break;
    case 1:
      result = {
        message:  `You won! ${playerSelection} beats ${computerSelection}`,
        player: 1,
        computer: 0
      };
      break;
    default:
      result = {
      message:   `You lose. ${computerSelection} beats ${playerSelection}`,
      player: 0,
      computer: 1
    };
  }
  gameStats.rounds.push(result);
  gameStats.scores.player += result.player;
  gameStats.scores.computer += result.computer;

  updateScoresDisplay();
  checkIfGamesOver();
}

const updateScoresDisplay = () => {
  gameEls.scoresPane.querySelector(".round-count").textContent = gameStats.rounds.length;
  gameEls.scoresPane.querySelector(".player-score").textContent = gameStats.scores.player;
  gameEls.scoresPane.querySelector(".computer-score").textContent = gameStats.scores.computer;
  const resultEl = document.createElement("p");
  resultEl.textContent = `Round ${gameStats.rounds.length}: ${gameStats.rounds[gameStats.rounds.length-1].message}`;
  gameEls.resultsPane.insertBefore(resultEl, gameEls.resultsPane.querySelector("p"));
}

const checkIfGamesOver = () =>{
  if(gameStats.scores.player >= 5 || gameStats.scores.computer >= 5){
    const resultEl = document.createElement("p");
    resultEl.textContent = `Game Over. ${gameStats.scores.player>=5 ? "Player" : "Computer"} won!`;
    gameEls.resultsPane.insertBefore(resultEl, gameEls.resultsPane.querySelector("p"));

    gameEls.playerPane.querySelectorAll(".player-option").forEach(option =>{
      option.removeEventListener("click", playRound);
    })    
  }
}

const gameStart = () => {
  let result;

  gameEls.introContainer.classList.toggle("is-hidden");
  gameEls.gameContainer.classList.toggle("is-hidden");
  gameEls.playerPane.querySelectorAll(".player-option").forEach(option =>{
    option.addEventListener("click", playRound);
  })
}
const gameEnd = () =>{

}


/***
 * Now we can start wiring stuff in! Yaaay!
 */
gameEls.introContainer.querySelector(".start-game").addEventListener("click", gameStart);