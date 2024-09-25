import dbConnect from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import '@/models/Property'
import MessageCard from "@/components/MessageCard";


const Page = async () => {
      // 1. Ensure DB Connection
      await dbConnect();
  
      // 2. Get the session user
      const sessionUser = await getSessionUser();
      if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
      }
      const { userId } = sessionUser;

      const readMessages = await Message.find({ recipient : userId, read : true})
      .sort({ createdAt : -1})
      .populate('sender', 'username')
      .populate('property', 'name')
      .lean()

      const unReadMessages = await Message.find({ recipient : userId, read : false})
      .sort({ createdAt : -1})
      .populate('sender', 'username')
      .populate('property', 'name')
      .lean()

      const messages = [...readMessages, ...unReadMessages].map((messageDoc) => {
        const message = messageDoc
        message.sender = messageDoc.sender
        message.property = messageDoc.property
        return message
      })


    return <section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
        <div className="space-y-4">
        {messages.length === 0 ? (
            <p>You have no messages</p>
        ) : (
            messages.map((message) => (
                <MessageCard key={message._id} message={message}/>
                
            ))
        )}
        </div>
        </div>
        </div>
    </section>;
}

export default Page;
