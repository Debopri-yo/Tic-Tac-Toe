console.log("Hello, World!");
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
console.log(Gameboard.getBoard());
Gameboard.setMark(0, "X");
console.log(Gameboard.getBoard());
Gameboard.resetBoard();
console.log(Gameboard.getBoard());
