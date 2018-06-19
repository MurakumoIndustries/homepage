import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'

var timer;
var initIframe = function () {
    var iframe = document.getElementsByClassName('news-iframe')[0];
    if (iframe.offsetHeight) {
        var src = iframe.getAttribute('data-src');
        iframe.src = src;
    }
};
window.onresize = function (event) {
    clearTimeout(timer);
    timer = setTimeout(initIframe, 500);
};
initIframe();