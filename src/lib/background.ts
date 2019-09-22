export function getTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve, reject) => {
    chrome.tabs.getAllInWindow((tabs: unknown) => {
      if (tabs && Array.isArray(tabs)) {
        resolve(tabs as chrome.tabs.Tab[])
      } else reject('Failed to retrieve tab details')
    })
  })
}
