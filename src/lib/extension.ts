export const lightModeStorageKey = 'lightMode'
export const AppId = 'chrome_ide_root'

export function getLocalStorage<T>(key: string): Promise<T | undefined> {
  return new Promise(resolve => {
    chrome.storage.local.get(key, response => resolve(response[key]))
  })
}

export function setLightMode() {
  const root = document.getElementById(AppId)

  if (!root) return

  root.style.setProperty('--tabFinderBackground', '#fff')
  root.style.setProperty('--tabFinderBackgroundDarker', '#e6e6e6')
  root.style.setProperty('--tabFinderFontColor', 'rgba(0, 0, 0, 0.87')
}

export function setDarkMode() {
  const root = document.getElementById(AppId)

  if (!root) return

  root.style.setProperty('--tabFinderBackground', '#0e0e31')
  root.style.setProperty('--tabFinderBackgroundDarker', '#030309')
  root.style.setProperty('--tabFinderFontColor', 'rgba(255, 255, 255, 0.87')
}
