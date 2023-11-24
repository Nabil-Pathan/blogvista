import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title :{
        type : String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    tags: [String],

    image : {
        type : String
    },

    createdAt:{
        type: Date,
        default:Date.now
    },

    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})


const BlogPost = mongoose.model("BlogPost", blogPostSchema)

export default BlogPost