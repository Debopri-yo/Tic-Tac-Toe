const Gameboard = (function () {
    let board=["","","","","","","","",""];
    const getBoard = () => board;
    const resetBoard = () => {
        board=["","","","","","","","",""];
    }
    const setMark = (index, mark) => {
        if (index >= 0 && index < 9 && board[index] === "") {
            board[index] = mark;
        
            return true;
        }
        return false;   
    }
return { getBoard, resetBoard, setMark };
})();

const Player = (name, mark) => {
    return { name, mark };
};
const GameController = (function () {
    let p1 = Player("Player 1", "X");
    let p2 = Player("Player 2", "O");
    let currentPlayer = p1;
    let round = 0;
    let gameOver = false;
    const switchPlayer = () => {
        currentPlayer = currentPlayer === p1 ? p2 : p1;
    }; 
    const getCurrentPlayer = () => currentPlayer;
    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = p1;
    };
    const checkDraw = () => {
        return round >= 9 && !gameOver;
    }
    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameOver = true;
                return true;
            }
        }
        return false;
    }
    const playRound = (index) => {
        Gameboard.setMark(index, currentPlayer.mark);
        round++;
        if (checkWin()) {
            console.log(`${currentPlayer.name} wins!`);
            return true;
        }else if (checkDraw()) {
            console.log("It's a draw!");
            return true;
        }
        switchPlayer();
        return false;      
    }
    return { getCurrentPlayer, resetGame, playRound };
})();
GameController.resetGame();
GameController.playRound(4); // X
GameController.playRound(0); // O
GameController.playRound(8); // X
GameController.playRound(2); // O
GameController.playRound(6); // X
GameController.playRound(3); // O
GameController.playRound(5); // X
GameController.playRound(7); // O
GameController.playRound(1); // X
console.log(Gameboard.getBoard());

