import User from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

export const signupController = async (req, res) => {
    const { name, email, password , pic } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the details" })
    }

    try {
        //   Check if user already exists 
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }


        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)

        const newUser = await User.create({ name, email, password : hashedPassword , pic})
        
        await newUser.save()
        
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECERET);


        return res.status(201).json({ message: "User registered",token, user: newUser })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }

}


export const signinController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ err: "Please fill all the details" });
    }

    const savedUser = await User.findOne({ email: email });

    if (!savedUser) {
        return res.status(422).json({ err: "Invalid Credentials" });
    }

    try {
        const isPasswordMatch = await bcrypt.compare(password, savedUser.password);
        if (isPasswordMatch) {
            console.log("Password match");
            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECERET);
            return res.status(200).json({ message: "Login successful", token , user:savedUser});
        } else {
            console.log("Password does not match");
            return res.status(422).json({ err: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};



export const verifyController = async (req,res) =>{
    const { name , email , password , pic} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the details" })
    }

    const user = await User.findOne({email})

    if(user){
        return res.status(422).json({message :"User already exists"})
    }


    try {
        let verificationCode = Math.floor(100000 + Math.random() * 900000)
        await mailer(email , verificationCode)

        let savedUser= {
            verificationCode ,
            name,
            email , 
            password,
            pic
        }

        res.status(200).json({message : "Verification Code sent to your email" , udata : savedUser})
    } catch (error) {
       console.log(error);   
       res.status(500).json({error})
    }
}


async function mailer(recieveremail , code){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure : false,
        requireTLS: true,
        auth:{
            user : "nabilpathan9624@gmail.com",
            pass: "vuihjvlrksdhakcu"
        } 
    })


    let info = {
        from: "nabilpathan9624@gmail.com",
        to: `${recieveremail}`,
        subject: "Signup verification",
        text: "Verify your account",
        html: `<p>Your Verification Code is ${code}`
    }


    await new Promise((resolve ,reject)=>{
        transporter.sendMail(info , (error)=>{
            if(error){
                console.log(error);
                reject(error)
            }

            else{
                console.log("Email has sent");
                resolve(info)
            }
        })
    })
}