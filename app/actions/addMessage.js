'use server'
import dbConnect from "@/config/database";

import { getSessionUser } from "@/utils/getSessionUser";

import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import Message from "@/models/Message";


async function addMessage(previousState, formData) {
    try {
      // 1. Ensure DB Connection
      await dbConnect();
  
      // 2. Get the session user
      const sessionUser = await getSessionUser();
      if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
      }
      const { userId } = sessionUser;
  
      // 3. Get recipient from formData
      const recipient = formData.get('recipient');
     

      
  
      // (Optional) Add recipient validation if needed
      if (!recipient) {
        return { error: 'Recipient is required' };
      }
      
  
      // 4. Create a new message
      const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        body: formData.get('body') || '', // Ensure body is not undefined
      });
  
      // 5. Save the new message in the database
      await newMessage.save();
  
      // 6. Return success status
      return { submitted: true };
    } catch (error) {
      // Handle and log errors appropriately
      console.error('Error adding message:', error);
      return { error: error.message || 'An error occurred while sending the message' };
    }
  }

  export default addMessage