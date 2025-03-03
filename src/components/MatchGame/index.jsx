import {Component} from 'react'
import NavBar from '../NavBar'
import TabItemList from '../TabItemList'
import GameOverCard from '../GameOverCard'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      randomImage: this.getRandomImage(props.imagesList),
      activeTabId: props.tabsList[0].tabId,
      score: 0,
      isGameOver: false,
      timer: 60,
    }

    this.timerId = null
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }

  startTimer = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.timer <= 1) {
        clearInterval(this.timerId)
        return {timer: 0, isGameOver: true}
      }
      return {timer: prevState.timer - 1}
    })
  }

  startTheGame = () => {
    const {imagesList} = this.props

    if (this.timerId) {
      clearInterval(this.timerId)
    }

    this.setState(
      {
        isGameOver: false,
        score: 0,
        timer: 60,
        randomImage: this.getRandomImage(imagesList),
      },
      () => {
        this.startTimer()
      },
    )
  }

  getRandomImage = imagesList => {
    const randomIndex = Math.floor(Math.random() * imagesList.length)
    return imagesList[randomIndex]
  }

  updateTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  getUpdatedImagesList = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    return imagesList.filter(each => each.category === activeTabId)
  }

  checkCorrectImage = id => {
    const {imagesList} = this.props
    const {randomImage} = this.state
    if (id === randomImage.id) {
      const newRandomImage = this.getRandomImage(imagesList)
      this.setState(prevState => ({
        score: prevState.score + 1,
        randomImage: newRandomImage,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  render() {
    const {tabsList} = this.props
    const {randomImage, score, activeTabId, isGameOver, timer} = this.state
    const {thumbnailUrl} = randomImage

    const requiredImagesList = this.getUpdatedImagesList()
    return (
      <div className="matchGame-bg-container">
        <NavBar score={score} timer={timer} />
        {isGameOver ? (
          <GameOverCard score={score} startTheGame={this.startTheGame} />
        ) : (
          <div className="macthGame-main-section">
            <div className="game-section">
              <div className="random-image-container">
                <img
                  src={thumbnailUrl}
                  alt="thumbnail"
                  className="random-image"
                />
              </div>
              <div className="tabSection">
                <ul className="tabItem-list">
                  {tabsList.map(each => (
                    <li key={each.tabId}>
                      <button
                        type="button"
                        className={`tabItem ${
                          each.tabId === activeTabId ? 'active-btn' : ''
                        }`}
                        onClick={() => this.updateTabItem(each.tabId)}
                      >
                        {each.displayText}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="tabItem-list-section">
                {requiredImagesList.map(each => (
                  <TabItemList
                    key={each.id}
                    eachItem={each}
                    checkCorrectImage={this.checkCorrectImage}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
