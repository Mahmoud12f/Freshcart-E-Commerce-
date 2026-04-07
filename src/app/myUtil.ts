import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();
  
  
  const sessionToken = 
    cookieStore.get('next-auth.session-token')?.value 
    

  if (!sessionToken) return null;

  
  const jwt = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET || ""
  });

  return jwt?.userToken; 
}