import { StreamChat } from "stream-chat";
import { ENV } from "./env";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API_KEY or STREAM_API_SECRET is missing");
}

export const chatclient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatclient.upsertUser(userData);
    console.log("Stream User Upserted Successfully", userData);
  } catch (error) {
    console.error("Error upserting Stream user", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatclient.deleteUsers([userId]);
    console.log("Stream User Deleted Successfully", userId);
  } catch (error) {
    console.error("Error Deleting Stream user", error);
  }
};

// todo : add another method to generate token
