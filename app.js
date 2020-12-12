import {db} from './object-db.mjs';

let dataStore = new db()
const startPromise = new Promise(async(resolve,reject)=>{
   await dataStore.start(process.argv[2])
   .then((resp) => {
       console.log(resp, 'ressp--->')
       resolve(true)
   })
   .catch((error)=>{
       console.log(error)
       reject(false)
   })
});

startPromise.then(async (res)=>{
    await dataStore.create('asf',{"af":{'dfsdf':56}}).then((res)=>{console.log(res)}).catch((error)=>console.log(error))
    await dataStore.create('asff',{"af":{'dfsdf':76}}).then((res)=>{console.log(res)}).catch((error)=>console.log(error))
    await dataStore.create('mohan',{"af":{'dfsdf':76}}).then((res)=>{console.log(res)}).catch((error)=>console.log(error))
    await dataStore.read('mohan').then((res)=>{console.log(res)}).catch((error)=>console.log(error))
    await dataStore.delete('mohan').then((res)=>{console.log(res)}).catch((error)=>console.log(error))
    await dataStore.read('mohan').then((res)=>{console.log(res)}).catch((error)=>console.log(error))
})
// dataStore.start(process.argv[2])
//    .then((resp) => {
//        dataStore.create('asf',{"af":{'dfsdf':56}})
//        .then((res)=>{
//         console.log(res)
//        })
//        .catch((error)=>{
//            console.log(error)
//        })
//    })
//    .catch((error)=>{
//        console.log(error)
//    })
