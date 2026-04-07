import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextConfig: NextAuthOptions = {
  // 1. إضافة الـ secret هنا إجباري عشان الـ decode يشتغل صح
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt", // التأكد من استخدام JWT
  },

  providers: [
    Credentials({
      name: "login to fresh cart",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async function (credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const resData = await res.json();

          if (res.ok && resData.message === "success") {
            const decoded: any = jwtDecode(resData.token);
            
            // بنرجع كائن فيه التوكن الأصلي بتاع الـ API
            return { 
                ...resData.user, 
                id: decoded.id || resData.user._id,
                userTkn: resData.token 
            };
          }
          return null;
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // خليك فاكر الاسم ده: userToken
        token.userToken = (user as any).userTkn;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).token = token.userToken;
      }
      return session;
    }
  }
};