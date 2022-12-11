//let a = ["x", "x", "o", "x", "o", "o", "x", "x", "o"];
let moves = 9;
let gameSize = 9;
let current = "X";
let winner = "";

function generateGame() {
    moves = 9;
    current = "X";
    winner = "";
    let container = document.createElement("div");
    container.setAttribute("class", "grid");

    let cell = document.createElement("div");
    cell.setAttribute("class", "e");

    let heading = document.createElement("div");
    heading.innerHTML = `This is tic tac toe!  <br>  <br>
                currently active: <span> ${current} </span> <br> 
                moves left -> <span> ${moves} </span>`;

    for (let i = 0; i < gameSize; i++) {
        let cellCopy = cell.cloneNode(true);
        cellCopy.addEventListener("click", handleClick);
        container.appendChild(cellCopy);
    }

    document.body.appendChild(heading);
    document.body.appendChild(container);
}

function play(cell) {
    if (cell.innerText == "") {
        cell.innerText = current;
        return true;
    } else {
        window.alert("This move is done already");
        console.log("This move is done already");
        return false;
    }
}

function updateGame() {
    console.log(winner);
    let titleParams = document.querySelectorAll("span");

    if (winner != "") {
        let endTitle = document.createElement("div");
        let restart = document.createElement("div");
        let restartB = document.createElement("button");
        endTitle.innerHTML = "This game ended as: ";
        if (winner == "draw") {
            endTitle.innerHTML += `a ${winner}!`;
        } else {
            endTitle.innerHTML += `${winner} WIN!`;
        }
        document.body.appendChild(endTitle);
        restart.innerHTML = "Please click here to restart game: ";
        restartB.innerText = "Restart";
        restartB.addEventListener("click", restartGame);

        document.body.appendChild(restart);
        document.body.appendChild(restartB);
    } else {
        console.log(titleParams);
        titleParams[0].innerText =
            current == "X" ? (current = "O") : (current = "X");
    }
    titleParams[1].innerText = --moves;
}

function checkWinCondition(a) {
    for (let i = 0; i < a.length; i += 4) {
        if (a[i] != "" && i == 0) {
            if (
                (a[i] == a[i + 1] && a[i + 2] == a[i]) ||
                (a[i] == a[i + 3] && a[i + 6] == a[i])
            ) {
                winner = current;
            }
        } else if (a[i] != "" && i == 4) {
            if (
                (a[i - 1] == a[i] && a[i + 1] == a[i]) ||
                (a[i - 3] == a[i] && a[i + 3] == a[i]) ||
                (a[i - 4] == a[i] && a[i + 4] == a[i]) ||
                (a[i - 2] == a[i] && a[i + 2] == a[i])
            ) {
                winner = current;
            }
        } else if (a[i] != "" && i == 8) {
            if (
                (a[i] == a[i - 1] && a[i] == a[i - 2]) ||
                (a[i] == a[i - 3] && a[i] == a[i - 6])
            ) {
                winner = current;
            }
        }
    }
    if (moves <= 1 && winner == "") {
        winner = "draw";
    }
}

function handleClick(ev) {
    let currentCell = ev.target;

    if (document.querySelector("button") != null) return;

    if (!play(currentCell)) return;

    let gridChildren = currentCell.parentElement.children;
    let grid = [];
    // console.log(gridChildren);

    for (const i of gridChildren) {
        grid.push(i.innerText);
    }
    console.log(grid);

    checkWinCondition(grid);

    updateGame();
}

function restartGame() {
    document.body.innerHTML = "";
    generateGame();
}

generateGame();
