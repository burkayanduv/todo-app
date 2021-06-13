const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true
        },
        reminder: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        index:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Task", TaskSchema)