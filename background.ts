chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      switch(request.messageType) {
        case "startLoginFlow":
          chrome.identity.launchWebAuthFlow({url: request.redirectUrl, interactive: true}).then(sendResponse);
          return true;
        case "requestRedirectUrl":
          sendResponse({redirectUrl: chrome.identity.getRedirectURL('index.html')});
          break;
      }
    }
  );