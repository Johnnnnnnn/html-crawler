document.addEventListener('DOMContentLoaded', function(dcle) {
    const startBtn = document.getElementById("button");

    let task;
    //點擊按鈕，向內容腳本發送訊息
    startBtn.addEventListener('click', function(e) {
        console.log('start');
        getHTML();
        task = setInterval( getHTML, 3000)
    });

});

function getHTML(){
    chrome.tabs.getSelected(null, function(tab){
       chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
         });
    });
}