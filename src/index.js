import $ from "jquery";
import 'popper.js'
import 'bootstrap';

import './style.scss'

$(function () {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/service-worker.js");
        })
    }

    var timer;
    var initIframe = function () {
        if ($('#news-container').is(':visible')) {
            console.log('load news');
            $('.news-iframe').each(function (i, iframe) {
                iframe.src = 'about:blank';
                if ($(iframe).is(':visible')) {
                    var src = iframe.getAttribute('data-src');
                    iframe.src = src;
                }
            });
        }
    };

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.news-iframe').each(function (i, iframe) {
            if ($(iframe).attr('src').indexOf('http') != 0 && $(iframe).is(':visible')) {
                var src = iframe.getAttribute('data-src');
                iframe.src = src;
            }
        });
    })

    window.onresize = function (event) {
        clearTimeout(timer);
        timer = setTimeout(initIframe, 500);
    };
    initIframe();
})