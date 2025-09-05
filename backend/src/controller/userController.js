

import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js'


export async function getRecommendationUser(req, res) {

    try {
        const currentUseId = req.user.id;
        const currentUser = req.user;

        const recommendationUsers = await User.find({
            $and: [
                { _id: { $ne: currentUseId } },
                { _id: { $nin: currentUser.friends } },
                { onBording: true }, //isOnbording
            ],
        });

        res.status(200).json(recommendationUsers);

    } catch (error) {
        console.error("error in getRecommendationUsers controller", error.message);
        res.status(500).json({ message: "internal server error" })
    }

}


export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("error in getmyfriends controller ", error);
        res.status(500).json({ message: "internal server error" });
    }
}


export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id; //id
        const { id: recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({ message: "you can't send friend requiest to yourself" });

        }

        const recipient = await User.findById(recipientId)

        if (!recipient) {
            return res.status(400).json({ message: "recepient not found" });

        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "you already friends with this user" });

        }
        // errpr remove send  //sendFriendRequest to FriendRequest
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: "a friend request already exitss between you and this user" })
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json(friendRequest) ///F to f
    } catch (error) {
        console.error("error in friends request controller", error);
        res.status(500).json({ message: "internal server error" });
    }

}


export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "user not found" })
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: "friend request acceptd" });

    } catch (error) {
        console.error("error in accept friends request controller", error.message);
        res.status(500).json({ message: "internal server error" });
    }
}


export async function getFriendRequest(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",

        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ incomingReqs, acceptReqs });

    } catch (error) {
        console.log("error in get requestPending controller");
        res.status(500).json({ message: "internal server error" })
    }

}


export async function getOutgoingFriendRequest(req, res) {
    try {
        const outgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequest)

    } catch (error) {
        console.log("error in get requestPending controller");
        res.status(500).json({ message: "internal server error" })
    }
}