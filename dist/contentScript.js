if(document.readyState !== 'complete') {
    window.addEventListener('load',afterWindowLoaded);
} else {
    afterWindowLoaded();
}

console.log('add content!');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: window.document.getElementsByTagName('body')[0].innerHTML});
});

function afterWindowLoaded() {
	console.log(window.document.getElementsByTagName('body')[0].innerHTML)
	chrome.runtime.sendMessage({type: "notification", options: { 
	    type: "basic", 
	    iconUrl: chrome.extension.getURL("icon128.png"),
	    title: "Test",
	    message: window.document.getElementsByTagName('body')[0].innerHTML
	}});
}