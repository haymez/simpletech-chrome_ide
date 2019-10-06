import React from 'react'

const css = require('./styles.scss')

interface OwnProps {
  value: boolean
  onChange?(val: boolean): void
  disabled?: boolean
}

interface State {}

export default class Toggle extends React.Component<OwnProps, State> {
  render() {
    const { value } = this.props
    const classes = [css.container, value ? css.active : false]
      .filter(Boolean)
      .join(' ')

    return (
      <button className={classes} onClick={this.handleChange}>
        <div className={css.toggler} />
      </button>
    )
  }

  handleChange = () => {
    const { value, onChange } = this.props

    onChange && onChange(!value)
  }
}
