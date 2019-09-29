import React from 'react'
const css = require('./styles.scss')

interface OwnProps {
  imageURL?: string
}

interface State {
  errored: boolean
}

export default class TabIcon extends React.Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props)

    this.state = {
      errored: false,
    }
  }

  render() {
    const { imageURL } = this.props
    const { errored } = this.state
    const classes = [css.container, errored ? css.errored : null]
      .filter(Boolean)
      .join(' ')

    return (
      <img
        className={classes}
        src={errored ? chrome.runtime.getURL('/assets/chrome.svg') : imageURL}
        onError={this.handleError}
      />
    )
  }

  handleError = () => {
    this.setState({ errored: true })
  }
}
