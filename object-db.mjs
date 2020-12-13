import * as fs from 'fs'
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
                //If path is not given,Starting db in current working directory
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
                                console.log('-------Database Loaded-------\n')
                                resolved(true)
                            }
                        })
                        this.dbPath = path + '/db.json'

                    } else {
                        //If existing DB is detected Reading it
                        await fs.readFile(path + '/db.json', 'utf8', (error, fileData) => {
                            if (error) {
                                rejected(error);
                            } else {
                                this.data = JSON.parse(fileData)
                                this.dbPath = path + 'db.json'
                                console.log(`-----Existing DB detected @ ${path+'db.json'}\n`)
                                console.log('-----Loading existing DB-----\n')
                                console.log('-------Database Loaded-------\n')
                                resolved(true);
                            }
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                console.log(error)
                rejected(false)
            }
        });


    }

    /**
     * @description Create new value in DB
     * @param {string} key Key of Data
     * @param {object} value value of Data
     * @returns {Promise} Resolve on Successful Creation. Reject on any errror.
     */
    async create(key, value) {
        return new Promise(async (resolved, rejected) => {
            const rejectReason = []
            console.log('------Inserting------')
            console.log(`${key} - ${JSON.stringify(value)}`)
            //Checking for DB size limit -- max(1GB)
            if (Buffer.byteLength(JSON.stringify(this.data)) / 1024 > 1024) {
                rejectReason.push(`Datastore size limit exceding 1GB. Cannot create.`)
                rejected(rejectReason)
                return
            }
            /* 
                ----Reqired Validation----
                Key:
                    1.Not null
                    2.Type of String
                    3.Min of 1 char and Max of 32 char
                    4.Key should be Unique
                value:
                    1.Not null or Empty
                    2.Type of Object
                    3.Max size of 16KB.
            */
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
                console.log('---------------------\n')
                rejected(false)
                return
            } else {
                this.data[key] = value;
                //Writing into DB
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
            console.log('Inserted\n---------------------\n')

        });
    }
    /**
     * @description Read value from DB
     * @param {string} key Key of Data
     * @returns {Promise} Resolve on Successful Read. Reject on any errror.
     */
    async read(key) {
        return new Promise((resolved, rejected) => {
            console.log('------Reading--------')
            console.log('Key-', key)
            //Checking key exists in DB
            if (!Object.keys(this.data).includes(key)) {
                console.log('Key does not exists')
                console.log('---------------------\n')
                rejected(false)
            } else {
                console.log(this.data[key])
                console.log('---------------------\n')
                resolved(this.data[key])
            }
        });
    }
    /**
     * @description Create new value in DB
     * @param {string} key Key of Data
     * @returns {Promise} Resolve on Successful Delete. Reject on any errror.
     */
    async delete(key) {
        console.log('------Deleting--------')
        console.log('Key-', key)
        return new Promise(async (resolved, rejected) => {
            //Checking key exists in DB
            if (!Object.keys(this.data).includes(key)) {
                console.log('Key does not exists')
                console.log('---------------------\n')
                rejected(false)
            } else {
                delete this.data[key]
                const deletePromise = new Promise(async (resolve, reject) => {
                    //Wring into DB
                    await fs.writeFileSync(this.dbPath, JSON.stringify(this.data), function (err) {
                        if (err) {
                            console.log(err)
                            reject(err)
                            return
                        } else {
                            resolve(true)
                        }
                    })
                });
                deletePromise.then((res) => {
                        resolved(true)
                    })
                    .catch((error) => {
                        rejected(error)
                    })
                console.log('Deleted\n---------------------\n')
            }
        });
    }
}
