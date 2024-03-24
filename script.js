const Gameboard = (() => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let currentPlayer = 'X';
    let winner = null;

    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != '' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return true;
            }
            else if (board[0][i] != '' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return true;
            }
        }

        if ((board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') || 
            (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] !='' ))
                return true;
        return false;
    };

    const checkDraw = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    return false;
                }
            }
        }
        return !checkWin();
    }

    const result = () => {
        if (checkWin()) {
            console.log("Winner:", winner);
            return (`Congratulations! ${winner} has won! Clear to restart.`);
        } else if (checkDraw()) {
            return ("It's a draw! Clear to restart.");
        }
    }
    

    const makeMove = (row, col) => {
        board[row][col] = currentPlayer;
        if (checkWin()) {
            winner = currentPlayer; // Store the winner
            console.log(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };
    


    return {
        makeMove,
        checkWin,
        checkDraw,
        result,
        board
    };
})();

const gameController = ((Gameboard) => {
    let cells = document.querySelectorAll('.cell');
    let displayResult = document.querySelector('.results');

    const display = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[(i * 3) + j].textContent = Gameboard.board[i][j];
            }
        }
    }

    const move = (index) => {
        return function() {
            let row = Math.floor(index / 3);
            let col = index % 3;
            if (!Gameboard.board[row][col]) {
                Gameboard.makeMove(row, col);
                display();
                if (Gameboard.checkWin() || Gameboard.checkDraw()) {
                    displayResult.textContent = Gameboard.result();
                    displayResult.classList.toggle('hidden');
                    cells.forEach((cell, index) => {
                        cell.classList.toggle('selectable');
                    });
                }
            }
        };
    };

    

    cells.forEach((cell, index) => {
        cell.addEventListener("click", move(index));
    });

    let clear = document.querySelector('.btn');
    clear.addEventListener("click", function() {
        window.location.reload();
    })

    return {
        display,
        move
    };
})(Gameboard);




/*
if (Gameboard.checkWin()) {
  let winner = Gameboard.currentPlayer;
  winner = winner === 'X' ? 'Player 2' : 'Player 1';
  console.log(`Congratulations! ${winner} has won!`);
} else if (Gameboard.checkDraw()) {
  console.log("It's a draw!");
} else {
  console.log("Continue playing...");
}
*/
