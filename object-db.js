const fs = require('fs')
const path = require('path')
class db{
    constructor(patha){
        fs.writeFileSync('db.json',JSON.stringify({}))
    }
}