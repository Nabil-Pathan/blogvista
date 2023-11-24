import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content:{
        type: String ,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true,
    },

    createdAt:{
        type: Date ,
        default: Date.now
    }
})


const Comment = new mongoose.model("Comment", commentSchema)

export default Comment