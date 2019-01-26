import $ from "jquery";
import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'

var timer;
var initIframe = function () {
    if ($('#news-container').is(':visible')) {
        console.log('load news');
        $('.news-iframe').each(function (i, iframe) {
            var src = iframe.getAttribute('data-src');
            iframe.src = src;
        });
    }
};

window.onresize = function (event) {
    clearTimeout(timer);
    timer = setTimeout(initIframe, 500);
};
window.onload = function (event) {
    initIframe();
}