import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    title:String,
    description:String
})

const userModel = mongoose.model('User',userSchema)

export default userModel