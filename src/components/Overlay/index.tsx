import React from 'react'
const css = require('./styles.scss')

interface Props {}

export default class Overlay extends React.Component<Props> {
  render() {
    const { children } = this.props

    return <div className={css.container}>{children}</div>
  }
}
