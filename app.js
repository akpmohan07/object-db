import {db} from './object-db.mjs'
let dataStore = new db()
const promise = new Promise((resolve,reject)=>{
    dataStore.start(process.argv[2])
    // resolve(true)
});
promise.then(dataStore.insert())
console.debug(dataStore.data)