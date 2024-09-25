"use server"
import dbConnect from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"


async function bookmarkProperty(propertyId) {
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
  let isBookmark = user.bookmarks.includes(propertyId);
  let message;
  
  if (isBookmark) {
    // If the property is already bookmarked, remove it
    user.bookmarks.pull(propertyId);
    message = 'Bookmark removed';
    isBookmark = false; // Now it's no longer bookmarked
  } else {
    // Otherwise, add the property to bookmarks
    user.bookmarks.push(propertyId);
    message = 'Bookmark added';
    isBookmark = true; // Now it's bookmarked
  }
  
  // Save the user's bookmarks
  await user.save();
  
  // Revalidate the saved properties page (optional)
  revalidatePath('/properties/saved', 'page');
  
  return {
    message,
    isBookmark, // Directly return the updated isBookmarked status
  };
  
}

export default bookmarkProperty