

import express from "express";
import { Router } from "express";


import { protectRoute } from '../middleware/auth.middleware.js'
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendRequest, getRecommendationUser, sendFriendRequest } from "../controller/userController.js";
const route = express.Router();

route.use(protectRoute);

route.get("/", getRecommendationUser);
route.get('/friends', getMyFriends);

route.post("/friend-request/:id", sendFriendRequest)
route.post("/friend-request/:id/accept", acceptFriendRequest)

route.post("/friend-request", getFriendRequest)
route.post("/outgoin-friend-request", getOutgoingFriendRequest)


export default route;