# Diferença entre o callback, promise e async/await

Este repositório tem o objetivo de mostrar a diferença na implementação do callback, promise e async/await tendo o objetivo final de mostrar como funciona o asyn/await e como melhora a legibilidade do projeto.

### Callback
```javascript

  function requestCallback (method, url, token, callback) {
      const xhr = new XMLHttpRequest();
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
    
```
Para executar o a requestCallback e pegar sua resposta seria necessário fazer isto aqui:

```javascript
requestCallback('GET', 'url.com', 'XXX-XXX', function printItems(err, items) {
    if(err) throw err;
    console.log(items); // aqui você teria a resposta da API com seus items.
})
```

### Promise

```javascript
  function requestPromise (method, url, token) {
      return new Promise (function (resolve, reject) {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
              if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                  resolve(xhr.response)
              } else {
                  reject(xhr.statusText)
              }
          }
          xhr.ontimeout = function () {
              reject('timeout')
            }
          xhr.open(method, url, true);
          xhr.setRequestHeader ("Authorization", token);
          xhr.send()
      })
  }

```
No exemplo abaixo demonstro como fazer o tratamento da requisição usando a promise, é necessário encadear com then e catch para poder ver a response da requisição.

```javascript
requestPromise('GET', 'url.com', 'XXX-XXX')
  .then((items) => {
    console.log(items) // dentro deste encadeamento do then, você consegue acessar os items da response.
  })

```


### Async/Await

Para reproduzir esta requisição com asyn/await você precisa que o request retorne uma promise e seu tratamento seria bem simples pois você usaria a palavra await na promise e ali já teria o valor da response.

```javascript
async function listItems() {
    const url = 'url.com'
    const token = "XXXX-XXXX";
    const items = await requestPromise('GET', url, token)           
    // você poderá acessar a resposta dessa promise sem precisar encadear em um then.
}
  
  
```
