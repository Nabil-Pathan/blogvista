import express from "express"
import { signupController  , signinController , verifyController} from "../controllers/authControllers.js"

const router = express.Router()


router.post('/signup', signupController)
router.post('/signin',  signinController)
router.post('/verify', verifyController )


export default router