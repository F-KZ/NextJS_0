"use client";
import { SessionProvider } from "next-auth/react"; // Correct path

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
