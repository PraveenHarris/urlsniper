// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "flashPopUpWithSnipedUrls") {
        const snipedUrls = message.snipedUrls;
        chrome.action.setPopup({ popup: `popup.html?snipedUrls=${encodeURIComponent(JSON.stringify(snipedUrls))}` });
    }
});