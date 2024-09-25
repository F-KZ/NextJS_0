import GoogleProvider from "next-auth/providers/google"
import dbConnect from "@/config/database"
import User from "@/models/User"

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    callbacks: {
      // Invoked on successful sign-in
      async signIn({ profile }) {
        try {
          await dbConnect(); // Ensure DB connection
  
          let user = await User.findOne({ email: profile.email });
  
          if (!user) {
            // Username capped at 20 characters
            const username = profile.name.slice(0, 20);
  
            user = await User.create({
              email: profile.email,
              username,
              image: profile.picture,
            });
          }
  
          return true; // Sign-in success
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Reject sign-in on failure
        }
      },
  
      // Invoked when session is created
      async session({ session }) {
        try {
          await dbConnect(); // Ensure DB connection
  
          const user = await User.findOne({ email: session.user.email });
  
          if (user) {
            session.user.id = user._id.toString(); // Add user ID to session
          } else {
            throw new Error("User not found");
          }
  
          return session;
        } catch (error) {
          console.error("Error in session callback:", error);
          return null; // Return null to invalidate the session
        }
      },
    },
  };