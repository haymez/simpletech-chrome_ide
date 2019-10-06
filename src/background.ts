import { getTabs, carpetBomb } from 'lib/background'
import { lightModeStorageKey } from 'lib/extension'

interface GetTabs {
  type: 'tabs'
}

interface HighlightAction {
  type: 'highlight'
  tab: chrome.tabs.Tab
}

interface SetLightMode {
  type: 'lightMode'
  value: boolean
}

export type BackgroundAction = GetTabs | HighlightAction | SetLightMode

chrome.runtime.onMessage.addListener(
  (
    action: BackgroundAction,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
  ) => {
    switch (action.type) {
      case 'tabs':
        getTabs().then(sendResponse)

        return true
      case 'highlight':
        if (action.tab.id) {
          chrome.tabs.highlight({
            tabs: action.tab.index,
          })
        }

        return false
      case 'lightMode':
        chrome.storage.local.set({ [lightModeStorageKey]: action.value })
        carpetBomb(action)

        return false
    }
  },
)
