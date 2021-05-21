import { Tab } from 'bootstrap';

import './style.scss'

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
    })
}

var iframeList = document.getElementsByClassName('news-iframe');

var initIframe = function () {
    var newsContainer = document.getElementById('news-container');
    if (window.getComputedStyle(newsContainer).display != "none") {
        console.log('load news 0');
        for (const iframe of iframeList) {
            iframe.src = 'about:blank';
            if (iframe.offsetParent && iframe.parentElement.classList.contains('show')) {
                var src = iframe.getAttribute('data-src');
                iframe.src = src;
                console.log('load:', src);
            }
        }
    }
};

for (const tab of document.querySelectorAll('a[data-bs-toggle="tab"]')) {
    tab.addEventListener('shown.bs.tab', function (event) {
        console.log('load news 1');
        for (const iframe of iframeList) {
            if (iframe.src.indexOf('http') != 0 && iframe.offsetParent) {
                var src = iframe.getAttribute('data-src');
                iframe.src = src;
                console.log('load:', src);
            }
        }
    })
}

var timer;
window.onresize = function (event) {
    clearTimeout(timer);
    timer = setTimeout(initIframe, 500);
};

setTimeout(initIframe, 500);