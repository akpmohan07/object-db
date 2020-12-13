import * as fs from 'fs'
import {
    resolve
} from 'path';
import {
    error
} from 'console';
export class db {
    constructor() {
        this.data = {}
        this.dbPath = ''
    }
    /**
     * @param {string} path If path is given in Argument
     * @param {undefined} path If path is not given in Argument
     */
    async start(path) {
        return new Promise(async (resolved, rejected) => {
            //Checking if path is given
            if (path) {
                console.log('\n---Instantiating DB instance in given Path---\n')
            } else {
                //If path isnot given Starting db in current directory
                console.log('\n---Instantiating DB instance in Default Path---\n')
                path = process.cwd()
            }

            //Checking if given path exists in the File System
            try {
                if (!fs.existsSync(path)) {
                    throw ('!!!Filepath does not exists.Please give Absolute path!!!\n')

                }
                console.log('---Checking for previous DB---\n')
                
                try {
                    //Checking if Existing DB is present in Given Path
                    if (!fs.existsSync(path + '/db.json')) {
                        //If no DB detected Creating new One.
                        await fs.writeFile(path + '/db.json', JSON.stringify(this.data), function (err) {
                            if (err) {
                                console.log(err)
                                rejected(err)
                            } else {
                                console.log(`---DB doest not exists---\n---creating new one @ ${path+'db.json'}---\n`)
                                resolved(true)
                            }
                        })
                        this.dbPath = path + '/db.json'

                    } else {
                        //If existing DB is detected Reading it.
                        await fs.readFile(path + '/db.json', 'utf8', (error, fileData) => {
                            if (error) {
                                rejected(error);
                            } else {
                                this.data = JSON.parse(fileData)
                                this.dbPath = path + 'db.json'
                                console.log(this.dbPath)
                                console.log(`-----Existing DB detected @ ${path+'db.json'}\n`)
                                console.log('-----Opening existing DB-----\n')
                                resolved(true);
                            }
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                rejected(error)
            }
        });
    }
    async create(key, value) {
        return new Promise(async (resolved, rejected) => {
            const rejectReason = []
            console.log(key, 'Inserting\n')
            if (Buffer.byteLength(JSON.stringify(this.data)) / 1024 > 1024) {
                rejectReason.push(`Datastore size limit exceding 1GB. Cannot create.`)
                rejected(rejectReason)
                return
            }
            if (key == null) {
                rejectReason.push('Key should not be null')
            }
            if (typeof key != 'string') {
                rejectReason.push('The type of key should be string')
            }
            if (typeof value != 'object') {
                rejectReason.push('The type of value should be object')
            } else if (value == null || Object.keys(value).length === 0) {
                rejectReason.push('Value should not be null or Empty')
            }
            if (key.length <= 0 || 32 < key.length) {
                rejectReason.push('The key should have Max of 32 chars and Min of 1 char.')
            }
            if (Object.keys(this.data).includes(key)) {
                rejectReason.push('Key already exists.Key should be unique.')
            }
            if (Buffer.byteLength(JSON.stringify(value)) / 1024 > 16) {
                rejectReason.push(`Value size should not be greate than 16KB.Your value size ${(Buffer.byteLength(JSON.stringify(value))/1024).toFixed(2)}KB`);
            }

            if (rejectReason.length) {
                console.log(rejectReason)
                rejected(rejectReason)
                return
            } else {
                this.data[key] = value;
                fs.writeFileSync(this.dbPath, JSON.stringify(this.data), function (err) {
                    if (err) {
                        console.log(err)
                        rejected(err)
                    } else {
                        resolved('Inserted')
                    }
                });
                let msg = `Space Used : ${(Buffer.byteLength(JSON.stringify(this.data))/1024).toFixed(2)}KB/1024MB`
                console.log(msg)
            }

        });
    }
    async read(key) {
        return new Promise((resolved, rejected) => {
            console.log(key, 'Reading\n')
            if (!Object.keys(this.data).includes(key)) {
                console.log('Key does not exists')
                rejected(false)
            } else {
                console.log(this.data[key])
                resolved(this.data[key])
            }
        });
    }
    async delete(key) {
        return new Promise(async (resolved, rejected) => {
            if (!Object.keys(this.data).includes(key)) {
                console.log('Key does not exists')
                rejected('Key does not exists')
            } else {
                console.log(key, 'Deleting\n')
                delete this.data[key]
                const deletePromise = new Promise(async (resolve, reject) => {
                    await fs.writeFileSync(this.dbPath, JSON.stringify(this.data), function (err) {
                        if (err) {
                            console.log(err)
                            reject(err)
                            return
                        } else {
                            resolve(`Deleted ${key}`)
                        }
                    })
                });
                deletePromise.then((res) => {
                        resolved('Deleted')
                    })
                    .catch((error) => {
                        rejected(error)
                    })
            }
        });
    }
}
