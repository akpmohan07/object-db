import {db} from './object-db.mjs';

let dataStore = new db()
// const promise = new Promise(async(resolve,reject)=>{
//    await dataStore.start(process.argv[2])
//    .then((resp) => {
//        console.log(resp, 'ressp--->')
//        if (resp) {
//         promise.then(dataStore.insert())
//         console.log(dataStore, 'datastore')
//        }
//    })
//    .catch((error)=>{
//        console.log(error)
//    })
//     resolve(true)
// });
dataStore.start(process.argv[2])
   .then((resp) => {
       dataStore.create('asf',{"af":{'dfsdf':56}})
       .then((res)=>{
        console.log(res)
       })
       .catch((error)=>{
           console.log(error)
       })
   })
   .catch((error)=>{
       console.log(error)
   })
