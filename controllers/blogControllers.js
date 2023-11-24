import mongoose from "mongoose"
import BlogPost from "../models/blogPostSchema.js"
import Comment from "../models/commentSchema.js"
export const createBlogController = async (req, res) => {

    try {
        const { title, content, image, tags } = req.body

        if (!title || !content) {
            return res.status(422).json({ error: "Title and content are required" })
        }

        const newBlogPost = await new BlogPost({
            title,
            content,
            image,
            tags,
            author: req.user._id
        })

        await newBlogPost.save()

        return res.status(201).json({ message: "Blog Created ", blogPost: newBlogPost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error " })
    }

}


export const updateBlogController = async (req, res) => {

    try {

        const { title, content, tags } = req.body
        const { postId } = req.params
        const { user } = req

        if (!title || !content) {
            return res.status(422).json({ error: "Title and content are required" })
        }

        const blogPost = await BlogPost.findById(postId)

        if (!blogPost) {
            return res.status(404).json({ error: "Post not found" })
        }

        // Check if user is author ot not

        console.log(blogPost.author.toString());
        console.log(user._id);

        if (blogPost.author.toString() !== user._id.toString()) {
            return res.status(422).json({ error: "Access Denied" })
        }

        // Update the blog post
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            postId,
            {
                title,
                content,
                tags,
            },
            { new: true }
        );

        return res.status(200).json({ message: "Blog Updated Successfully ", blogPost: updatedBlogPost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error " })
    }
}


export const deleteBlogController = async (req, res) => {

    try {

        const { postId } = req.params
        const { user } = req

        const blogPost = await BlogPost.findById(postId)

        if (!blogPost) {
            return res.status(404).json({ error: "Post not found" })
        }

        // Check the user is author or not 

        if (blogPost.author.toString() !== user._id.toString()) {
            return res.status(422).json({ error: "Access Denied" });
        }

        await BlogPost.findByIdAndRemove(postId)

        return res.status(200).json({ message: "Blog post deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const getUserBlogPostController = async (req, res) => {

    try {
        const userId = req.user._id

        const userBlogPosts = await BlogPost.find({ author: userId })

        return res.status(200).json({ userBlogPosts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error " })
    }

}


export const getBlogPostsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 9

        const skip = (page - 1) * limit

        const totalPosts = await BlogPost.countDocuments()
        const totalPages = Math.ceil(totalPosts / limit)

        const blogPosts = await BlogPost.find()
            .skip(skip)
            .limit(limit)
            .exec()

        return res.status(200).json({
            message: "Blog Posts recieved",
            blogPosts,
            currentPage: page,
            totalPosts,
            totalPages
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error " })
    }
}

export const searchAndSortBlogsController = async (req, res) => {
    try {
        const { searchQuery, sortBy } = req.query;

        let sortOptions = {}

        if (sortBy == "date") {
            sortOptions = { createdAt: -1 }
        }

        const searchCriteria = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } },
            ]
        }

        const blogPosts = await BlogPost.find(searchCriteria)
            .sort(sortOptions)
            .exec()

        return res.status(200).json({ message: "Search and sort Successful", blogPosts: blogPosts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const getSingleBlogPostController = async (req, res) => {
    const { id } = req.params

    try {
        const blogPost = await BlogPost.findById({ _id: id }).populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'name pic ', // Only select the 'name' field from the User model
            },
        });
        if (!blogPost) {
            return res.json({ success: false, message: "Cannot find the Post" }).status(404)
        }
        return res.json({ success: true, blogPost }).status(200)
    } catch (error) {
        return res.json({ success: false, message: "Something Went wrong in Singlepost controller", error: error.message }).status(500)
        console.log(error);
    }
}


export const addCommentController = async (req, res) => {
    const { postId } = req.params
    const { content } = req.body
    const userId = req.user._id

    try {
        const blogPost = await BlogPost.findById(postId)

        console.log('Before Adding Comment ', blogPost);

        if (!blogPost) {
            return res.json({ success: false, message: "Post not found !" }).status(404)
        }

        const newComment = await new Comment({
            user: userId,
            content,
            post: blogPost._id
        })
        console.log('Coment Created ');

        try {
            await newComment.save()
        } catch (error) {
            console.log(error);
        }

        blogPost.comments.push(newComment);

        await blogPost.save()

        console.log('After Adding Comment ', blogPost);

        return res.json({ success: true, message: "Comment Added" }).status(201)
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong !" }).status(500)
        console.log(error.message);
    }
}


export const getCommentsController = async (req, res) => {

    const ObjectId = mongoose.Types.ObjectId

    const postId = new ObjectId(req.params.id)
    try {
        const comments = await Comment.find({ post: postId }).populate('user')
        return res.json({ success: true, comments }).status(200)
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong  !", error: error.message }).status(500)
        console.log(error.message);
    }
}

export const getuserposts = async (req, res) => {
    try {
        const { userId } = req.params

        const userBlogPosts = await BlogPost.find({ author: userId })

        return res.json({ success: true, blogPosts: userBlogPosts }).status(200)
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong  !", error: error.message }).status(500)
    }

}