import React from 'react'
const css = require('./styles.scss')

interface Props {
  onClick?: () => void
}

export default class Overlay extends React.Component<Props> {
  render() {
    const { children, onClick } = this.props

    return (
      <div onClick={() => onClick && onClick()} className={css.container}>
        {children}
      </div>
    )
  }
}
