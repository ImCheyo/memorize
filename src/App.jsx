import { useState } from "react";
import PropTypes from "prop-types";

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  updateBoard: PropTypes.func,
  index: PropTypes.number
};

const symbols = ['🐑', '🐘', '🐫', '🐻', '🐭', '🐹', '🐰', '🐨', '🐔', '🐣',
  '🐥', '🐧', '🐸', '🐍', '🐢', '🐲', '🐡', '🐠', '🐗', '🐮',
  '🐷', '🐳', '🐬', '🐟', '🐚', '🐌', '🐝', '🐙', '🐜', '🐛',
  '🐞', '🐴', '🐱', '🐯', '🐺', '🐒', '🐶', '🐩', '🐼']


function App() {
  const boardEasy = symbols.slice(0, 10);
  const boardNormal = symbols.slice(0, 20);
  const boardHard = symbols.slice(0, 30);

  const [board, setBoard] = useState(boardEasy)
  const [boardStyle, setBoardStyle] = useState("gameEasy")

  const changeBoard = (newBoard, newBoardStyle) => {
    setBoard(newBoard);
    setBoardStyle(newBoardStyle);
  }

  return (
    <main className="board">
      <h1>Memorize!</h1>
      <section className={boardStyle}>
        {
          board.map((_, index) => {
            return (
              <Card
                key={index}
                index={index}
              >
                {board[index]}
              </Card>
            )
          })
        }
      </section>
      <div>
        <button onClick={() => changeBoard(boardEasy, "gameEasy")}>Easy</button>
        <button onClick={() => changeBoard(boardNormal, "gameNormal")}>Normal</button>
        <button onClick={() => changeBoard(boardHard, "gameHard")}>Hard</button>
      </div>
    </main>
  )
}

export default App
