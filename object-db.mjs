
import * as fs from'fs'
export class db{
    constructor(){
    }
    async start(path){
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
            this.twirlTimer(1000);
            console.log('---Checking for previous DB---\n')
            try{
                this.twirlTimer(1000);
                this.data = {}
                if(!fs.existsSync(path+'/db.json')){
                    fs.writeFile(path+'/db.json',JSON.stringify(this.data),function(err){
                        if(null){
                        throw(err)
                        }
                    })
                    throw(`---DB doest not exists---\n---creating new one @ ${path+'/db.json'}---\n`)
                }
                fs.readFile(path+'/db.json','utf8',(error,fileData)=>{
                    if(error)
                    console.log(error)
                    this.data = JSON.parse(fileData)
                    console.log(this.data)
                })
                console.log(`-----Existing DB detected @ ${path+'/db.json'}\n`)
                console.log('-----Opening existing DB-----\n')
            }
            catch(message){
                console.log(message)
            }

        }catch(error){
            console.log(error)
        }
    }
    async insert(key,value){
        console.log(this.data)
        console.log('insert')
    }
   twirlTimer(time) {
        const interval = setInterval(function() {
            process.stdout.write("#")
        }, 100);
        setTimeout(function(){
            clearInterval(interval)
        },time)
      }
}
