'use strict';

const url = 'https://best-credit-card.herokuapp.com/v1/'

const xhr = new XMLHttpRequest();

function request (method, url) {
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.send()
};