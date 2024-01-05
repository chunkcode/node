const fs = require('fs')

function upload (name,file1,id){
try{
    file1_type = file1.mime.split('/')[1]
    let writer = fs.createWriteStream('./media/'+name+'_'+id+"."+file1_type)
    writer.write(Buffer.from(file1.data, 'base64'),poo =(err)=>{
        if(err){
            writer.on("error",()=>{})
            return ("No File")  
        }
        else{
            return (name+'_'+id+"."+file1_type)
        }

    }
    
    )
    return poo()
    
     }
     catch(err){
        return ("No File")
     }
    }

module.exports = upload