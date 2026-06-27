import express from 'express'
import mongoose from 'mongoose'
import userModel from './mongoDB.js'
import cors from 'cors'

const app = express()

app.use(cors())



// middleware
app.use(express.urlencoded({ extended: true }))

// for thunderClient bcause db sends json data
app.use(express.json())


// db connection
mongoose.connect('mongodb://localhost:27017/to-do')
    .then(() => {
        console.log('DB CONNECTED!!');
    })
    .catch((err) => {
        console.log(err);

    })


app.get('/', (req, res) => {
    res.send('hello khalid')
})


app.post('/add-task', async (req, res) => {
    try {
        const data = await userModel.create(req.body)

        res.status(201).json({
            message: 'success',
            task: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const result = await userModel.find()
        res.status(200).json({
            message: 'success',
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: 'failded',
            error: error.message
        })
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'delete failed',
            error: error.message
        });
    }
});

app.delete('/delete-multiple', async (req,res) => {
    try {
        const {ids} = req.body
        const result = await userModel.deleteMany({_id : {$in:ids}})

        res.status(200).json({
            message:'success',
            result:result
        })
    } catch (error) {
        res.status(500).json({
            message:'failed',
            error:error.message
        })
    }
})


app.get('/task/:id', async (req, res) => {
    try {
        const result = await userModel.findById(req.params.id)
        res.status(200).json({
            message: 'done',
            result: result
        })

    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
})

app.put('/task/:id', async (req, res) => {
    try {
        const result = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(201).json({
            message: "done",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            result: error.message
        })
    }
})



app.listen(2100)