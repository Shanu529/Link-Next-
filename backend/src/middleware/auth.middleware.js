import jwt from 'jsonwebtoken';
import User from '../models/User.js'

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        console.log("here is token", token)
        if (!token) {
            return res.status(401).json({ message: "invaild token" });
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "unauthorized user" });
        }

        console.log("Decoded userId:", decoded.userId);
        const user = await User.findById(decoded.userId).select("-password");
        console.log("User found in DB:", user);
        
        if (!user) {
            console.log("error in user")
            return res.status(401).json({ message: "unauthorized user in db" });

        }
        req.user = user
        next()
    } catch (error) {
        console.log("error in auth middleware", error)
    }

}