console.log('background!')

const taskArray = [];
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (sender.tab)
    {
        // message from tabs
        taskArray.forEach( (callback) => {
            callback(message, sender);
        });
        

    }
    else
    {
        // message from popup
        if (message.message === 'start_crawl')
        {
            // start crawl

            // create new tab
            chrome.tabs.create(
                {
                    "url": message.target,
                    "selected":false
                },
                function(tab) {
                    // inject script to target
                    injectContentScript(tab.id);

                }
            );

            // add callback when recieve message from tabs
            taskArray.push( (tabsMsg, tabsSender) => {
                $.ajax({
                    type: 'POST',
                    data: { 
                        message : tabsMsg.options.message
                    },
                    url: message.server, 
                    success: function(result) {
                        console.log(result)
                    }
                });
                
                setTimeout( function() {
                    chrome.tabs.reload(tabsSender.tab.id);
                    injectContentScript(tabsSender.tab.id);
                },  message.interval * 1000)
            })

        }
    }

});

function injectContentScript(id) {
    chrome.tabs.executeScript(
        id, 
        {
            file: 'contentScript.js'
        }
    );
}