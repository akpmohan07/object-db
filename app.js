import {db} from './object-db.mjs';

let dataStore = new db()
const startPromise = new Promise(async(resolve,reject)=>{
   await dataStore.start(process.argv[2])
   .then((resp) => {
       resolve(true)
   })
   .catch((error)=>{
       console.log(error)
       reject(false)
   })
});

let sample_create = {
    "1" : {name: 'A'},
    "2" : {name: ',B'},
    "3" : {name: 'C'},
    "4" : {name: 'D'},
}
let sample_read = ['1','2','3','4','5']

let sample_delete = ['1','2','5']
startPromise.then(async (res)=>{

    for(let each in sample_create){
         dataStore.create(each,sample_create[each]).then((res)=>{console.log(res)}).catch((error)=>{})
    }
    for(let each in sample_read){
   dataStore.read(sample_read[each]).then((res)=>{}).catch((error)=>{})
    }
    for(let each in sample_delete){
        dataStore.delete(sample_delete[each]).then((res)=>{}).catch((error)=>{})
    }
    for(let each in sample_read){
        dataStore.read(sample_read[each]).then((res)=>{}).catch((error)=>{})
         }

})
