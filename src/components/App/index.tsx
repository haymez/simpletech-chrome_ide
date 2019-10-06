import React from 'react'
import TabFinder from 'components/TabFinder/index'
import {
  getLocalStorage,
  setLightMode,
  setDarkMode,
  lightModeStorageKey,
} from 'lib/extension'
import { BackgroundAction } from 'background'
const css = require('./styles.scss')

interface Props {}

interface State {
  active: boolean
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  componentDidMount() {
    getLocalStorage<boolean>(lightModeStorageKey).then(val => {
      val ? setLightMode() : setDarkMode()
    })

    chrome.runtime.onMessage.addListener((message: BackgroundAction) => {
      if (message.type === 'lightMode') {
        message.value ? setLightMode() : setDarkMode()
      }
    })

    document.addEventListener('keydown', this.keydownHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler)
  }

  render() {
    const { active } = this.state

    return (
      <div className={css.container}>
        <TabFinder active={active} toggleActive={this.toggleActive} />
      </div>
    )
  }

  toggleActive = () => {
    const { active } = this.state

    this.setState({ active: !active })
  }

  keydownHandler = (e: KeyboardEvent) => {
    if (e.shiftKey && e.ctrlKey && e.key === 'H') this.toggleActive()
  }
}
