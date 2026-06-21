import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send('hello khalid')
})

app.listen(2100)