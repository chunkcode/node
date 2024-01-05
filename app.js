const express = require('express');
const path =  require('path');
const logger = require('./logger')
const auth = require('./auth')
const mongoRoutes = require('./routes/mongoRoutes')
const fs = require('fs')
require('dotenv').config();
const connectdb = require('./config/database')
connectdb()
const app = express();
app.use(express.json())

const { check, validationResult } = require('express-validator');

var loginValidate = [
    
    check('name').isAlpha().withMessage('Provide valid name'),
    check('phone').isLength({ min: 10,max:10 }).withMessage('Phone must be 10 digits').matches('[0-9]').withMessage('Phone must be number'),
    check('email', 'Provide valid email').isEmail().trim().escape().normalizeEmail(),
    check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape(),
    check('file1').exists().withMessage('file 1 is required')];


app.use(express.static('./static'))
app.use('/mongo',mongoRoutes)
app.use(['/api','/query'],[logger])
// app.use(logger,auth)

app.get('/',(req,res)=>{
    res.status(200).send('Home Page');
})






app.post('/upload',loginValidate, (req, res) => {
    
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
	}
    try{
    file1_type = req.body.file1.mime.split('/')[1]
    let writer = fs.createWriteStream('./media/file_1_'+'.'+file1_type)
    writer.write(Buffer.from(req.body.file1.data, 'base64'),(err)=>{
        if(err){
            writer.on("error",()=>{})
            res.status(500).json({ "message": "Something went wrong !"})   
        }
        else{
            if( req.body.file2){
                file2_type = req.body.file2.mime.split('/')[1]
                let writer = fs.createWriteStream('./media/file_2_'+'.'+file1_type)
                writer.write(Buffer.from(req.body.file1.data, 'base64'),(err)=>{
                    if(err){
                        writer.on("error",()=>{})
                        res.status(500).json({ "message": "Something went wrong !"})   
                    }
                    else{
                        res.status(201).json({ "message": "uploaded sucessfully", "url": "url" })
                    }});
                   
               
            }
            else{
                console.log("no file 2")
                res.status(201).json({ "message": "uploaded sucessfully", "url": "url" })
            }
        }
    })
     }
     catch(err){
        res.status(500).json({ "message": "Something went wrong !"}) 
     }
    })
    
    
   
   























app.get('/test',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'./templates/test.html'));
})
app.get('/api/:chim/',auth, (req,res)=>{
    res.status(200).json([{'name':'john','age':25},{'name':'mike','age':30},{'test':'cool','arr':[12,'123',{'animal':'lion'}]}])
})
app.get('/params/:data1/chill/:data2',(req,res)=>{
    res.status(200).json(
        {'requested params':req.params,
          'data':req.params.data
         })
})
app.get('/query',(req,res)=>{
    if(req.query.data){
    res.status(200).json(
        {'requested params':req.query,
          'data':req.query.data
         })
        }
    else{
        res.status(200).send("NO QUERY")
    }
})



//mix of params and query
app.get('/mix/:name/marks',(req,res)=>{
    if(req.params.name,req.query.age){
       res.status(200).json({'name':req.params.name,'age':req.query.age})
    }
    else if(req.params.name){
        res.status(200).json({'name':req.params.name,'age':req.query.age})
    }
    else{
        res.status(200).send("NO QUERY")
    }
})

//send 444 error code 

app.get('/errortest',(req,res)=>{
    res.destroy(null);
})

app.all('*',(req,res)=>{
    res.destroy(null);
})
app.listen(process.env.PORT, ()=>{
    console.log('listening to port ',process.env.PORT);
})