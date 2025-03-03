import './index.css'

const TabItemList = props => {
  const {eachItem, checkCorrectImage} = props
  const {id, imageUrl, category} = eachItem

  const submitImage = () => {
    checkCorrectImage(id)
  }

  return (
    <li className="TabItemList-container">
      <button type="button" className="image-button" onClick={submitImage}>
        <img src={imageUrl} alt="match" className="tabItem-image" />
      </button>
    </li>
  )
}

export default TabItemList
