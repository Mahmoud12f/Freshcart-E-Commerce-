import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {

    const pathName = req.nextUrl.pathname
    const isAuth : boolean = pathName === '/login' || pathName === '/register';
    const token = await getToken({ req });
    if(isAuth){
        if(token){
            return NextResponse.redirect(new URL('/' , req.url))
        }
        return NextResponse.next()
    }

  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ['/cart', '/brands', '/shop' , '/login' , '/register'],
};
