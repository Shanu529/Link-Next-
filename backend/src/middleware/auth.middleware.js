

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {

        // const token = req.cookies.jwt;
        const token = req.cookies.jwt || req.cookies.token;
       
        console.log("Token received:", token);

        console.log("here is token", token);

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log("Decoded userId:", decoded.userId);

        const user = await User.findById(decoded.userId).select("-password");
        console.log("User found in DB:", user);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        console.log("here is user request sending by user",req.user);
        
        next();
    } catch (error) {
        console.log("Error in auth middleware", error);
        return res.status(401).json({ message: "Token verification failed" });
    }
};
