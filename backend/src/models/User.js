

import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            minlength: 6
        },
        bio: {
            type: String,
            default: ""

        },
        profilePic: {
            type: String,
            default: ""
        },
        nativeLanguage: {
            type: String,
            default: ""
        },
        onBording: {
            type: Boolean,
            default: false
        },

        friends: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "user",
            }
        ]

    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error);
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
}



const user = mongoose.model("User", userSchema)
export default user;