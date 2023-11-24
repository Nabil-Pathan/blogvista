import express from "express"
import {authMiddleware} from "../middlewares/auth.js"
import { followUser, getFollowerStatus, getFollowers, getUserProfile, unFollowUser } from "../controllers/userController.js"
const router = express.Router()


router.post('/follow/:userId' , authMiddleware, followUser )
router.post('/unfollow/:userId', authMiddleware, unFollowUser)
router.get('/followers/:userId', authMiddleware , getFollowers)
router.get('/profile/:userId', authMiddleware, getUserProfile)
router.get('/follow-status/:userId', authMiddleware,getFollowerStatus)

export default router