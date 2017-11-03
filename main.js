'use strict';

const url = 'https://best-credit-card.herokuapp.com/v1/me/wallets'
const xhr = new XMLHttpRequest();
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDk5MzI5MzIsImlkIjoxLCJuYW1lIjoiQWxsaXNvbiBWLiJ9.N0XSf5f65d_F_FYPER9TonH62b4FdyGTilJVl1RwLVg";

// Execution 1
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

//request('GET', url, token);

// Callbacks Execution

function request (method, url, token, callback) {
    xhr.open(method, url, true);
    xhr.setRequestHeader ("Authorization", token);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(null, JSON.parse(xhr.response));            
        } else {
            callback(xhr.status, xhr.response)
        }
    }
    xhr.send()
};

request('GET', url, token, function printWallet(err, wallets) {
    if(err) throw err;
    wallets.forEach(function(element) {
        let url = `https://best-credit-card.herokuapp.com/v1/cards/wallets/${element.id}`;
        request('GET', url, token, function printCards(err,cards) {
            if(err) throw err;
            console.log(cards)
        })
    }, this);
});

