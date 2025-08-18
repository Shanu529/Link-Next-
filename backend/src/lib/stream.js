



import { StreamChat } from 'stream-chat';
import "dotenv/config";


// STREAM_API_KEY=wrbrvdjhwyxr
// STREAM_API_SECRET=qgzax9cm3upvg3rsd478zkbthgbx3cwpbywhh23fhkmu8e4mp867ygv4w8s4mctr

const apiStreamKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiSecret || !apiStreamKey) {
    throw new Error("Missing Stream API Key or Secret in environment variables");
}

const streamClient = StreamChat.getInstance(apiStreamKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        // await upsertStreamUser.upsertUsers(userData);
        // return userData;
        await streamClient.upsertUser(userData); 
        return userData;
    } catch (error) {
        console.log("error in stream user model");
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.log("error in generate stream token", error.message);
        
    }
};
