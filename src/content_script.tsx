import React from 'react'
import { render } from 'react-dom'
import App from 'components/App/index'
import { AppId } from 'lib/extension'

const root = document.createElement('div')
root.id = AppId

document.body.appendChild(root)

render(<App />, root)
