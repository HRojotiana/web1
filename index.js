let rule = document.getElementById('rule');
let indication = document.getElementById('indication');
let close = document.getElementById('close');
let boxes = Array.from(document.getElementsByClassName('box'));
let title = document.getElementById('title');
let reset = document.getElementById('reset');
let reference = document . getElementById('reference');

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('----winner-color')

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null)

//Rule button clicked
rule.addEventListener('click', () => {
    indication.classList.remove('none');
});
 
//Close button clicked
close.addEventListener('click', () => {
    indication.classList.add('none');
});

//Start game function
let startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

//When a case is clicked
function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            title.innerText = `Player ${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();

            winning_blocks.map(box => boxes[box].style.backgroundColor = '#3f2f05')
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT 
        reference.innerText = currentPlayer; 
    }
    else
    restart();
}

//The winning condition
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

//Winning function
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[b] === spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}


//Button reset clicked
reset.addEventListener('click', restart)

//Restart function
function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })
    title.innerText = 'Tic Tac Toe';
    currentPlayer = X_TEXT
    reference.innerText = currentPlayer

}

startGame();



