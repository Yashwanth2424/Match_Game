import './index.css'

const NavBar = props => {
  const {score, timer} = props
  return (
    <div className="nav-bar-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="website-logo"
        />
      </div>
      <div className="navbar-score-timer-section">
        <p className="navbar-score">Score: {score}</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
          alt="timer"
          className="timer-icon"
        />
        <p className="seconds-timer">{timer} Sec</p>
      </div>
    </div>
  )
}

export default NavBar
