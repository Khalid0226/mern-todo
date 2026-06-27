import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    title:String,
    description:String
})

const taskModel = mongoose.model('Task',userSchema)

export default taskModel