import express from 'express'
import mongoose from 'mongoose'
import userModel from './mongoDB.js'

const app = express()

// middleware
app.use(express.urlencoded({extended:true}))

// for thunderClient bcause db sends json data
app.use(express.json())


// db connection
mongoose.connect('mongodb://localhost:27017/to-do')
.then(()=>{
    console.log('DB CONNECTED!!');
})
.catch((err)=>{
    console.log(err);
    
})


app.get('/',(req,res)=>{
    res.send('hello khalid')
})


app.post('/add-task',async (req,res)=>{
    try {
        const data = await userModel.create(req.body)

        res.status(201).send({
            message:'success',
            task:data
        })
    } catch (error) {
        res.status(500).send({
            message:'failed',
            error:error.message
        })
    }
})

app.listen(2100)