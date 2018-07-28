console.log('background!')

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    $.ajax({
        type: 'POST',
        data: { 
            message : message.options.message
        },
        url: "http://localhost:8081/", 
        success: function(result){
            console.log(result)
    }});
    setTimeout( function() {
        chrome.tabs.reload(sender.tab.id);
    }, 5000)
});
