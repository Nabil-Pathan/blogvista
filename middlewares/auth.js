// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"
// import User from "../models/userSchema.js"


// export default middleware = (req,res,next) =>{
//     const { authorization } = req.headers;

//     if(!authorization){
//         return res.status(401).send({err: "You must be logged in ! key not given"})
//     }

//     const token = authorization.replace("Bearer ", "");
//     jwt.verify(token,process.env.JWT_SECERET, async (err  , payload)=>{
//         if(err){
//             return res.status(401).send({err: "Token not match"})
//         }
//         const { _id} = payload;
//         User.findById(_id).then(userdata=>{
//             req.user = userdata
//             next()
//         })
//     })
//     next();
// }


import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ err: "You must be logged in! Token not given" });
        }

        const token = authorization.replace("Bearer ", "");

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECERET);
        
        // Find the user and attach it to the request object
        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).send({ err: "User not found" });
        }

        req.user = user; // Attach user object to req

        next(); // Continue to the next middleware or route handler
    } catch (err) {
        console.error(err.message);
        return res.status(401).send({ err: "Invalid token" });
    }
};

