
import * as fs from'fs'
export class db{
    constructor(){
    }
    async start(path){
        return new Promise(async(resolved, rejected) => {
        if(path){
            console.log('\n---Instantiating DB instance in given Path---\n')
            }
            else{
                console.log('\n---Instantiating DB instance in Default Path---\n')
                path = process.cwd()
            }
        try{
            if(!fs.existsSync(path)){
                throw('!!!Filepath does not exists.Please give Absolute path!!!\n')
                
            }
            console.log('---Checking for previous DB---\n')
            try{
                this.data = {}
                if(!fs.existsSync(path+'/db.json')){
                    await fs.writeFile(path+'/db.json',JSON.stringify(this.data),function(err){
                        if (err) {
                            console.log(err)
                            rejected(err)
                        }
                        else{
                            console.log(`---DB doest not exists---\n---creating new one @ ${path+'db.json'}---\n`)
                            this.dbPath = path+'db.json'
                            resolved(true)
                        }
                    })
                } else {
                    await fs.readFile(path + '/db.json', 'utf8', (error, fileData) => {
                        if (error) {
                            rejected(error);
                        } else {
                            this.data = JSON.parse(fileData)
                            this.dbPath = path+'db.json'
                            console.log(`-----Existing DB detected @ ${path+'db.json'}\n`)
                            console.log('-----Opening existing DB-----\n')
                            resolved(true);
                        }
                    })
                }
            }
            catch(error){
                console.log(error)
            }

        }catch(error){
            rejected(error)
        }
    });
    }
    async create(key,value){
            return new Promise(async(resolved, rejected) => {
                const rejectReason = []
                if(Buffer.byteLength(JSON.stringify(this.data))/1024 > 1024){
                    rejectReason.push(`Datastore size limit exceding 1GB. Cannot create.`)
                    rejected(rejectReason)
                    return
                }
                if(key == null){
                    rejectReason.push('Key should not be null')
                }
                if(typeof key != 'string'){
                    rejectReason.push('The type of key should be string')
                }
                if(typeof value != 'object'){
                    rejectReason.push('The type of value should be object')
                }
                else if(value == null || Object.keys(value).length === 0){
                    rejectReason.push('Value should not be null or Empty')
                }
                if(key.length<=0 || 32<key.length){
                    rejectReason.push('The key should have Max of 32 chars and Min of 1 char.')
                }
                if(Object.keys(this.data).includes(key)){
                    rejectReason.push('Key already exists.Key should be unique.')
                }
                if(Buffer.byteLength(JSON.stringify(value))/1024 > 16){
                    rejectReason.push(`Value size should not be greate than 16KB.Your value size ${(Buffer.byteLength(JSON.stringify(value))/1024).toFixed(2)}KB`);
                }

                if(rejectReason.length){
                    rejected(rejectReason)
                    return
                }
                else{
                    this.data[key] = value;
                    await fs.writeFile(this.dbPath,JSON.stringify(this.data),function(err){
                        if (err) {
                            console.log(err)
                            rejected(err)
                            return
                        }
                    });
                    let a = `Space Availabe : ${(Buffer.byteLength(JSON.stringify(this.data))/1024/1024).toFixed(2)}MB/1024MB`
                    resolved(a)
                }

        }
    );
}
async read(key){
    return new Promise((resolved,rejected)=>{
        if(!Object.keys(this.data).includes(key)){
            rejected('Key does not exists')
        }
        else{
            resolved(this.data[key])
        }
    });
}
async delete(key){
    return new Promise(async(resolved,rejected)=>{
        if(!Object.keys(this.data).includes(key)){
            rejected('Key does not exists')
        }
        else{
            delete this.data[key]
            await fs.writeFile(this.dbPath,JSON.stringify(this.data),function(err){
                if (err) {
                    console.log(err)
                    rejected(err)
                    return
                }
            });
            resolved('deleted')
        }
    });
}
}
