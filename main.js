'use strict';

const url = 'https://best-credit-card.herokuapp.com/v1/me/wallets'

const xhr = new XMLHttpRequest();
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDk5MzI5MzIsImlkIjoxLCJuYW1lIjoiQWxsaXNvbiBWLiJ9.N0XSf5f65d_F_FYPER9TonH62b4FdyGTilJVl1RwLVg";

function request (method, url, token) {
    xhr.open(method, url, true);
    xhr.setRequestHeader ("Authorization", token);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            
            const wallets = JSON.parse(xhr.response);
            wallets.forEach(function(element) {
                var wallet = document.createElement("li"); 
                var content = document.createTextNode(JSON.stringify(element));
                wallet.appendChild(content);
                var domWallets = document.getElementById('wallets');
                domWallets.appendChild(wallet);
                
            }, this);
        } else {

        }
    }
    xhr.send()
};

request('GET', url, token);