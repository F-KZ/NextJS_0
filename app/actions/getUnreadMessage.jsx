"use server"
import dbConnect from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser"


async function getUnreadMessageCount(messageId){
    await dbConnect();

    // Get the session user
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
  
    // Check if the user is authenticated
    if (!sessionUser || !userId) {
      throw new Error('User ID is required');
    }
  
    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    })

    return { count }
}

export default getUnreadMessageCount