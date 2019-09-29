import React, { Fragment } from 'react'
import Overlay from 'components/Overlay/index'
const css = require('./styles.scss')

interface Props {
  active: boolean
  toggleActive(): void
}

interface State {
  tabs: chrome.tabs.Tab[]
  textValue: string
  currentSelection: number
}

export default class TabFinder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      tabs: [],
      textValue: '',
      currentSelection: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler)
  }

  componentDidUpdate(prevProps: Props) {
    const { active } = this.props
    const justActivated = !prevProps.active && active

    if (justActivated) {
      this.setState({ currentSelection: 0, textValue: '' })

      this.updateTabsList()
    }
  }

  render() {
    const { active, toggleActive } = this.props

    if (!active) return null

    return (
      <Overlay onClick={toggleActive}>
        <div className={css.container} onClick={e => e.stopPropagation()}>
          <div className={css.tabsContainer}>
            {this.renderSearch()}
            <Fragment>{this.tabs().map(this.renderTab)}</Fragment>
          </div>
        </div>
      </Overlay>
    )
  }

  // Partials
  renderSearch() {
    const { textValue } = this.state

    return (
      <input
        className={css.input}
        type='text'
        value={textValue}
        onChange={this.handleTextValueChange}
        placeholder='Type to search open tabs'
        autoFocus
      />
    )
  }

  renderTab = (tab: chrome.tabs.Tab, index: number) => {
    const { currentSelection } = this.state
    const classes = [css.tab]

    if (currentSelection === index) classes.push(css.selected)

    return (
      <div
        key={tab.id}
        className={classes.join(' ')}
        onMouseOver={() => this.setState({ currentSelection: index })}
        onClick={() => this.selectTab()}
      >
        <img className={css.favicon} src={tab.favIconUrl} />
        <div className={css.tabTitle}> {tab.title} </div>
      </div>
    )
  }

  // Functions
  tabs() {
    const { tabs, textValue } = this.state
    const regex = new RegExp(textValue.split('').join('.*'), 'i')

    return tabs.filter(tab => !textValue || regex.test(tab.title || ''))
  }

  updateTabsList() {
    chrome.runtime.sendMessage({ type: 'tabs' }, tabs =>
      this.setState({ tabs }),
    )
  }

  handleTextValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ textValue: e.currentTarget.value })
  }

  keydownHandler = (e: KeyboardEvent) => {
    const { active, toggleActive } = this.props

    if (!active) return

    if (e.key === 'Escape') toggleActive()
    else if (e.key === 'ArrowDown') this.arrowDown()
    else if (e.key === 'ArrowUp') this.arrowUp()
    else if (e.key === 'Enter') this.selectTab()
  }

  arrowDown() {
    const { currentSelection } = this.state
    const newValue = currentSelection + 1

    this.setState({
      currentSelection: newValue >= this.tabs().length ? 0 : newValue,
    })
  }

  arrowUp() {
    const { currentSelection } = this.state
    const newValue = currentSelection - 1

    this.setState({
      currentSelection: newValue < 0 ? this.tabs().length - 1 : newValue,
    })
  }

  selectTab() {
    const { toggleActive, active } = this.props
    const { currentSelection } = this.state

    if (active) toggleActive()

    chrome.runtime.sendMessage({
      type: 'highlight',
      tab: this.tabs()[currentSelection],
    })
  }
}
