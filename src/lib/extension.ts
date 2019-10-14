export const lightModeStorageKey = 'lightMode'
export const AppId = 'chrome_ide_root'

interface TabMatch {
  tab: chrome.tabs.Tab
  matches: RegExpMatchArray[]
}

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

export function filterTabs(tabs: chrome.tabs.Tab[], query: string) {
  const regex = new RegExp(query.split('').join('.*'), 'i')

  if (!query) return tabs

  return tabs
    .reduce(
      (arr, tab) => {
        const titleMatch = (tab.title || '').match(regex)
        const urlMatch = (tab.url || '').match(regex)
        const matches = [titleMatch, urlMatch].filter(isMatch)

        if (matches.length === 0) return arr

        arr.push({
          matches,
          tab,
        })

        return arr
      },
      [] as TabMatch[],
    )
    .sort((a: TabMatch, b: TabMatch) => {
      const aLength = shortestMatch(a)
      const bLength = shortestMatch(b)

      if (aLength > bLength) return 1
      else if (aLength < bLength) return -1
      else return 0
    })
    .map(tabMatch => tabMatch.tab)
}

function shortestMatch(tabMatch: TabMatch): number {
  const sorted = tabMatch.matches.sort(
    (a: RegExpMatchArray, b: RegExpMatchArray) => {
      const aLength = a[0].length
      const bLength = b[0].length

      if (aLength > bLength) return 1
      else if (aLength < bLength) return -1
      else return 0
    },
  )

  return sorted[0].length
}

function isMatch(match: RegExpMatchArray | null): match is RegExpMatchArray {
  return match !== null
}
