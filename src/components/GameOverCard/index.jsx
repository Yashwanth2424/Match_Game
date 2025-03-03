import './index.css'

const GameOverCard = props => {
  const {score, startTheGame} = props

  return (
    <div className="game-over-bg-container">
      <div className="game-over-section">
        <div className='trophy-image-card'>
            <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="Game over trophy"
                  className="trophy"
            />
        </div>
        <div>
          <p className="your-score-text">YOUR SCORE</p>
          <h1 className="final-score-text">{score}</h1>
          <button
            type="button"
            className="try-again-button"
            onClick={startTheGame}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="Play again"
              className="reset-icon"
            />
            <p>Play Again</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverCard
