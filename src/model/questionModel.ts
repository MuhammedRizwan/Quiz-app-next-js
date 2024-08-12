import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        unique: true,
        required: true
    },
    A:{
        type:String,
        required:true
    },
    B:{
        type:String,
        required:true
    },
    C:{
        type:String,
        required:true
    },
    D:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Question = mongoose.models.question || mongoose.model('question', questionSchema)
export default Question;

