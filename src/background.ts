import { getTabs } from 'lib/background'

interface GetTabs {
  type: 'tabs'
}

interface HighlightAction {
  type: 'highlight'
  tab: chrome.tabs.Tab
}

type Action = GetTabs | HighlightAction

chrome.runtime.onMessage.addListener(
  (
    action: Action,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void,
  ) => {
    switch (action.type) {
      case 'tabs': {
        getTabs().then(sendResponse)
        break
      }
      case 'highlight': {
        if (action.tab.id) {
          chrome.tabs.highlight({
            tabs: action.tab.index,
          })
        }
        break
      }
    }

    return true
  },
)
