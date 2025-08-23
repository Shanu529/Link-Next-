
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { upsertStreamUser } from '../lib/stream.js'

export async function siginup(req, res) {

    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all filed are required" })
        }
        if (password.length <= 6) {
            return res.status(400).json({ message: "password should be atlast 6 digits" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "email already exist" })
        }

        const index = Math.floor(Math.random() * 100) + 1 //generate ramdom index number 

        const ramdomAvtar = `https://avatar.iran.liara.run/public/${index}.png`
        

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: ramdomAvtar
        });

        try {
            console.log("here is env tokrn ",process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",

            });
            console.log(`stream created for ${newUser.fullName}`);

        } catch (error) {
            console.log("there are error in stream user 2 ", error);

        }
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })

        res.cookie("jwt", token, {
            httpOnly: true,       // cannot be accessed by JS in browser
            secure: process.env.NODE_ENV === "production", // only HTTPS in production
            sameSite: "lax",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send success response
        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log(error);
        res.json(error.message, { message: "something went wrong" })

    }




}












export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all filed are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "invaild email or password" })
        }

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "invaild email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })

        res.cookie("jwt", token, {
            httpOnly: true,       // cannot be accessed by JS in browser
            secure: process.env.NODE_ENV === "production", // only HTTPS in production
            sameSite: "strict",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send success response
        res.status(200).json({ message: "Login successful", success: true, user: { id: user._id, email: user.email } });

    } catch (error) {
        console.log("problems in login controller");
        return res.status(500).json({ message: "internal problems" });


    }

}

export function logout(req, res) {
    res.clearCookie("jwt");
    return res.status(200).json({ success: true, message: "logout successfull" })

}



export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("here is uesrId",userId);
        
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "all fileds are requireddd",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location "
                ].filter(Boolean),
            });
        };
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            onBording: true
        }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: "can't be updated due to internal problems" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error in authController on borading function" })
    }
};