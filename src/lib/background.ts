export function getTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve, reject) => {
    chrome.tabs.getAllInWindow((tabs: unknown) => {
      if (tabs && Array.isArray(tabs)) {
        resolve(tabs as chrome.tabs.Tab[])
      } else reject('Failed to retrieve tab details')
    })
  })
}

/** Sends message to all tabs */
export function carpetBomb(message: unknown) {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      if (tab.id) chrome.tabs.sendMessage(tab.id, message)
    })
  })
}
