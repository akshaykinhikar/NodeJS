# Concepts to enhance NodeJS develpopment

##### What is Promise and which scenarios which promise should be used

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

#####
```javascript

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


