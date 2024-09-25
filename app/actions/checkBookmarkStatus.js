"use server"
import dbConnect from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

async function checkBookmarkStatus(propertyId){
    await dbConnect();

    // Get the session user
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
  
    // Check if the user is authenticated
    if (!sessionUser || !userId) {
      throw new Error('User ID is required');
    }
  
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    // Check if the property is already bookmarked
    let isAlreadyBookmarked = user.bookmarks.includes(propertyId);

    return {isAlreadyBookmarked} 

}

export default checkBookmarkStatus