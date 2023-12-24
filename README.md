# Concepts to enhance NodeJS develpopment

##### What is Promise and in which different scenarios promise methods should be used

<details><summary><b>Answer</b></summary>
<p> To perform any async operation we use promise. Promises have 3 states - Pending, resolved and rejected<p>
<p>There are four methods available on promise </p>
<ul>
  <li>promise.all() - will execute all promise if any failse then only that promise is returned</li>
  <li>promise.allSettled() -  status and value object </li>
  <li>promise.any() - only first resolved will be output else if all rejected then error stack</li>
  <li>promise.race() - will return first resolved/rejected</li>
</ul>

```javascript
const firstPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("hello from firstPromise")
    },100);
});

const secondPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("hello from secondPromise")
    },200);
});

const thirdPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("hello from thirdPromise");
        // reject("hello from thirdPromise");
    },100);
});

Promise.all([firstPromise,secondPromise,thirdPromise]).then((res)=> {
    console.log(res);
})
```
<p>Output</p>

```javascript
//Promise.all
(3) ['hello from firstPromise', 'hello from secondPromise', 'hello from thirdPromise']
// below will be output in case of promise.all reject
hello from thirdPromise

// Promise.allSettled resolve and reject cases:
[
{"status":"fulfilled","value":"hello from firstPromise"},
{"status":"fulfilled","value":"hello from secondPromise"},
{"status":"fulfilled","value":"hello from thirdPromise"}
]

[
{"status":"fulfilled","value":"hello from firstPromise"},
{"status":"fulfilled","value":"hello from secondPromise"},
{"status":"rejected","reason":"hello from thirdPromise"}
]

// Any
"hello from firstPromise"

//only first will be output which ever is resolved first else
//AggregateError: All promises were rejected {stack: 'AggregateError: All promises were rejected', message: 'All promises were rejected', errors: Array(3)}

//race
"hello from firstPromise"

```
</details>


##### What is Event Emitter


<details><summary><b>Answer</b></summary>


```javascript
const events = require('events');


const event = new events.EventEmitter();

const myCLBListener = (data)=> {
    console.log('Hey A is listening ...,' + data);
}

event.on('A', myCLBListener);

event.on('B', ()=> {
    console.log('Hey B is listening ...,')
});

event.emit('A', ['lorem','ipsome']);
event.emit('B');
event.removeListener('A', myCLBListener);
event.emit('A', ['lorem','ipsome']);
console.log('I guess A is removed');

event.emit('B');

event.removeAllListeners();
```

<p>Output</p>

```javascript
Hey A is listening ...,lorem,ipsome
Hey B is listening ...,
I guess A is removed
Hey B is listening ...,

```
</details>

