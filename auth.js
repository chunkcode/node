
const auth = (req,res,next)=>{
    console.log(req.params)
    if(req.params.chim== 1){
        next()
    }
    else{
        res.status(400)
        res.json({"msg":"no entry"})
    }
}

module.exports = auth