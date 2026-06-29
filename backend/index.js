import express from 'express'
import mongoose from 'mongoose'
// import userModel from './mongoDB.js'
import taskModel from './models/taskModel.js'
import userModel from './models/userModel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import cors from 'cors'

import verifyToken from './middleware/auth.js'

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
        const data = await taskModel.create(req.body)

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

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'email and password is required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        // 🔥 JWT TOKEN GENERATE

        const token = jwt.sign(
            {
                id: data._id,
                email: data.email
            },
            'secretkey',
            { expiresIn: '1d' }
        )
        // console.log(token);

        res.status(201).json({
            message: 'success',
            result: data,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'email and password is required!!'
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'invalid email'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                message: 'invalid password'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            'secretkey',
            { expiresIn: '1d' }

        )

        res.status(200).json({
            message: 'done!!',
            result: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
})

app.get('/tasks', verifyToken, async (req, res) => {
    try {
        const result = await taskModel.find()
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
        await taskModel.findByIdAndDelete(req.params.id);

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

app.delete('/delete-multiple', async (req, res) => {
    try {
        const { ids } = req.body
        const result = await taskModel.deleteMany({ _id: { $in: ids } })

        res.status(200).json({
            message: 'success',
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed',
            error: error.message
        })
    }
})


app.get('/task/:id', async (req, res) => {
    try {
        const result = await taskModel.findById(req.params.id)
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
        const result = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

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