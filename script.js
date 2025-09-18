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
        currentPlayer = p1;round = 0;gameOver = false;
    };
  const isGameOver = () => gameOver; 
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
        if(gameOver){
            return;
        }else if (checkWin()) {
            console.log(`${currentPlayer.name} wins!`);
            gameOver=true;round=0;
            return true;
        }else if (checkDraw()) {
            console.log("It's a draw!");
            gameOver=true;
            return true;
        }
        switchPlayer();
        return false;      
    }
    return { getCurrentPlayer, resetGame, playRound,isGameOver };
})();

const DisplayController = (() => {
  const buttons=document.querySelectorAll('.buttons');
  function renderBoard(){
    const board=Gameboard.getBoard();
    const Over=GameController.isGameOver();
    for (let i = 0; i < board.length; i++) {
    buttons[i].textContent = board[i];
    buttons[i].disabled = Over || board[i] !== "";  
  }} 
    
for (const button of buttons){
  button.addEventListener("click",()=>{
   const index = button.dataset.index; 
    GameController.playRound(index);
    renderBoard();
  });
}
const newGame=document.getElementById("newGame")
  newGame.addEventListener("click",()=>{
  GameController.resetGame();
  renderBoard();
});  
return { renderBoard };
})();
