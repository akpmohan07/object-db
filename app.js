import {
    db
} from './object-db.mjs';


//Creating DB instance
let dataStore = new db()
// Starting Db
const startPromise = new Promise(async (resolve, reject) => {
    await dataStore.start(process.argv[2])
        .then((resp) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })
});

//Sample Create files
let sample_create = {
    "1": {
        name: 'A'
    },
    "2": {
        name: ',B'
    },
    "3": {
        name: 'C'
    },
    "4": {
        name: 'D'
    },
}

//Sample Read Keys
let sample_read = ['1', '2', '3', '4', '5']

//Sample Delete keys
let sample_delete = ['1', '2', '5']

//After starting DB Doing CRD Operations
startPromise.then(async (res) => {

    //Create operation
    for (let each in sample_create) {
        dataStore.create(each, sample_create[each]).then((res) => {}).catch((error) => {})
    }
    //Reading after inserting
    for (let each in sample_read) {
        dataStore.read(sample_read[each]).then((res) => {}).catch((error) => {})
    }
    //Deleting Some values
    for (let each in sample_delete) {
        dataStore.delete(sample_delete[each]).then((res) => {}).catch((error) => {})
    }
    //Reading after deleting some Value
    for (let each in sample_read) {
        dataStore.read(sample_read[each]).then((res) => {}).catch((error) => {})
    }

})
.catch((error)=>{})
