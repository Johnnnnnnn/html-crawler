document.addEventListener('DOMContentLoaded', function(dcle) {
    const startBtn = document.getElementById("start");

    startBtn.addEventListener('click', function() {
        const url = document.getElementById("upload-url").value || '/';
        const port = document.getElementById("upload-url-port").value || '80';
        const target = document.getElementById("target-site").value || '';
        const interval = document.getElementById("interval").value || '5';

        chrome.runtime.sendMessage(
            {
                message: 'start_crawl',
                server: `http://localhost:${port}${url}`,
                target: target,
                interval: interval
            },
            function (response) {
                console.log(response.message);
            }
        );
    });

});
