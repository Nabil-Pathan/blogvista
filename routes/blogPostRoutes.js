import express from "express"
import { authMiddleware } from "../middlewares/auth.js"
import { createBlogController, deleteBlogController, getBlogPostsController, getUserBlogPostController, searchAndSortBlogsController, updateBlogController , getSingleBlogPostController, addCommentController, getCommentsController, getuserposts } from "../controllers/blogControllers.js"

const router = express.Router()

router.post('/create' , authMiddleware , createBlogController)
router.put('/update/:postId' ,authMiddleware ,updateBlogController )
router.delete('/delete/:postId' ,authMiddleware ,deleteBlogController )
router.get('/getuserposts', authMiddleware , getUserBlogPostController)
router.get('/getallposts', authMiddleware , getBlogPostsController)
router.get("/search", authMiddleware ,  searchAndSortBlogsController);
router.post('/add-comment/:postId', authMiddleware , addCommentController)
router.get('/comments/:id', authMiddleware , getCommentsController)
router.get('/post/:id', authMiddleware, getSingleBlogPostController);
router.get('/user/:userId', authMiddleware, getuserposts)

export default router