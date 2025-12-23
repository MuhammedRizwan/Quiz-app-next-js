import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    A: {
        type: String,
        required: true,
        trim: true
    },
    B: {
        type: String,
        required: true,
        trim: true
    },
    C: {
        type: String,
        required: true,
        trim: true
    },
    D: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true,
        enum: ['A', 'B', 'C', 'D']
    }
}, {
    timestamps: true
})

// Index for better query performance
questionSchema.index({ createdAt: -1 });

const Question = mongoose.models.question || mongoose.model('question', questionSchema)
export default Question;

