const express = require('express');
const path =  require('path');
const logger = require('./logger')
const auth = require('./auth')
require('dotenv').config();
const app = express();


app.use(express.static('./static'))

app.use(['/api','/query'],[logger,auth])
// app.use(logger,auth)

app.get('/',(req,res)=>{
    res.status(200).send('Home Page');
})

app.get('/test',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'./templates/test.html'));
})
app.get('/api',(req,res)=>{
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