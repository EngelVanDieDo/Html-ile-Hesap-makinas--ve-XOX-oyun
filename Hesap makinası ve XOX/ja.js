let display = document.querySelector(".input");
let buttons = document.querySelectorAll("button");
let clear = document.querySelector("#clear");
let equal = document.querySelector("#equal");
let board = ["", "", "", "", "", "", "", "", ""];
let players = ["X", "O"];
let currentPlayer;
let gameWon = false;



buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    if (button.value === "=") {
      display.value = eval(display.value);
    } else if (button.value === "C") {
      display.value = "";
    } else {
      display.value += button.value;
    }
  });
});

clear.addEventListener("click", function() {
  display.value = "";
});

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll("td");
const result = document.querySelector("#result");

startGame();



function startGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = players[0];
  gameWon = false;
  result.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
    cell.style.backgroundColor = "";
  });
  
  setTurn();

}
function yenile() {
  location.reload();
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("id");
  if (board[index] !== "" || gameWon) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    gameWon = true;
    result.textContent = `${currentPlayer} kazandı!`;
    cells.forEach(cell => {
      if (winningConditions.includes(cell.getAttribute("id"))) {
        cell.style.backgroundColor = "#4CAF50";
		
      }
    });
    return;
  }
  if (checkTie()) {
    result.textContent = "Berabere!";
    return;
  }
  switchPlayer();
  setTurn();
}

function checkWin() {
  return winningConditions.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function checkTie() {
  return board.every(cell => {
    return cell !== "";
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
}

function setTurn() {
  const turn = document.querySelector("#turn");
  turn.textContent = `${currentPlayer}'nin sırası`;
 
}

