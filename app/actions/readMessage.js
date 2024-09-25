"use server"
import dbConnect from "@/config/database"
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache";

async function readMessage(messageId){
    await dbConnect();

    // Get the session user
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
  
    // Check if the user is authenticated
    if (!sessionUser || !userId) {
      throw new Error('User ID is required');
    }
  
    // Find the user by their ID
    const message = await Message.findById(messageId);

    if(!message) throw new Error(' message not found')
        
     // verify ownership
     if(message.recipient.toString() !== userId) throw new Error('Unauthorized')
       
        message.read = !message.read

        revalidatePath('/messages', 'page')

        await message.save()

        return message.read

}

export default readMessage