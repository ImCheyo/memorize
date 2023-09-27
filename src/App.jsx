import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Card = ({ children, isHidden, onClick }) => {
  return (
    <div className={`card ${isHidden ? "hidden" : ""}`} onClick={onClick}>
      {isHidden ? "?" : children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  isHidden: PropTypes.bool,
  onClick: PropTypes.func
};

const symbols = ['🐑', '🐘', '🐫', '🐻', '🐭', '🐹', '🐰', '🐨', '🐔', '🐣',
  '🐥', '🐧', '🐸', '🐍', '🐢', '🐲', '🐡', '🐠', '🐗', '🐮',
  '🐷', '🐳', '🐬', '🐟', '🐚', '🐌', '🐝', '🐙', '🐜', '🐛',
  '🐞', '🐴', '🐱', '🐯', '🐺', '🐒', '🐶', '🐩', '🐼']

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


function generateBoard(difficulty) {
  let boardSize = 5;
  if (difficulty === "normal") {
    boardSize = 10;
  } else if (difficulty === "hard") {
    boardSize = 15;
  }

  const shuffledSymbols = shuffleArray(symbols);
  const board = shuffledSymbols.slice(0, boardSize);
  const pairs = [];

  for (const symbol of board) {
    pairs.push({ symbol, isHidden: true });
    pairs.push({ symbol, isHidden: true });
  }

  return shuffleArray(pairs);
}

function App() {
  const [boardStyle, setBoardStyle] = useState("gameEasy");
  const [board, setBoard] = useState(generateBoard("easy"));
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([]);
  const [gameMode, setGameMode] = useState("Easy");

  const changeBoard = (newDifficulty) => {
    const newBoard = generateBoard(newDifficulty);
    setBoard(newBoard);
    setBoardStyle(`game${newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)}`);
    setGameMode(newDifficulty);
  }

  useEffect(() => {
    const initialBoard = generateBoard("easy");
    setBoard(initialBoard);
    setGameMode("Easy");
    console.log('useEffect')
  }, []);

  const handleCardClick = (index) => {
    if (selectedCardIndexes.length < 2) {
      const updatedBoard = [...board];
      updatedBoard[index].isHidden = false;
      setBoard(updatedBoard);

      setSelectedCardIndexes([...selectedCardIndexes, index]);
    }

    if (selectedCardIndexes.length === 1) {
      const firstIndex = selectedCardIndexes[0];
      const secondIndex = index;
      if (board[firstIndex].symbol !== board[secondIndex].symbol) {
        setTimeout(() => {
          const resetBoard = [...board];
          resetBoard[firstIndex].isHidden = true;
          resetBoard[secondIndex].isHidden = true;
          setBoard(resetBoard);
        }, 1000);
      }

      setSelectedCardIndexes([]);
    }
  }

  return (
    <main className="board">
      <h1>Memorize!</h1> <br />
      <h3>Difficulty: {gameMode.toUpperCase()}</h3> <br />
      <section className={boardStyle}>
        {board.map((card, index) => (
          <Card key={index}
          isHidden={card.isHidden}
          onClick={() => handleCardClick(index)}>
            {card.symbol}
            </Card>
        ))}
      </section>
      <div>
        <button onClick={() => changeBoard("easy")}>Easy</button>
        <button onClick={() => changeBoard("normal")}>Normal</button>
        <button onClick={() => changeBoard("hard")}>Hard</button>
      </div>
    </main>
  )
}

export default App;
