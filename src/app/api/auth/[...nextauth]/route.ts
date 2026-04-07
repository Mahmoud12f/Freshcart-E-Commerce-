import { nextConfig } from "@/nextauth/nextuth";
import NextAuth from "next-auth";

const myRouterHandlerObject = NextAuth(nextConfig)

export {myRouterHandlerObject as GET , myRouterHandlerObject as POST}