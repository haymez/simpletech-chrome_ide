import React, { useState, useEffect } from 'react'
import Toggle from 'components/Toggle/index'
import { getLocalStorage, lightModeStorageKey } from 'lib/extension'
const css = require('./styles.scss')

export function Settings() {
  const [lightMode, setLightMode] = useState<boolean | undefined>()
  useEffect(() => {
    getLocalStorage<boolean>(lightModeStorageKey).then(val =>
      setLightMode(!!val),
    )
  }, [])

  if (lightMode === undefined) return null

  const classes = [css.container, lightMode ? css.lightMode : false]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className={css.title}>Chrome IDE Settings</div>
      <div className={css.rows}>
        <div className={css.row}>
          <label className={css.label}>
            <div className={css.flex}>
              <span className={css.flexTitle}>Dark Mode</span>
              <Toggle
                value={lightMode}
                onChange={newVal => updateTheme(newVal, setLightMode)}
              />
              <span className={css.flexTitle}>Light Mode</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

function updateTheme(newVal: boolean, setLightMode: (val: boolean) => void) {
  setLightMode(newVal)
  chrome.runtime.sendMessage({ type: 'lightMode', value: newVal })
}
