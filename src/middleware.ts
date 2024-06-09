import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const authRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathname);
  const mailRoute = pathname.startsWith("/emails");

  const session = await auth();
  const token = session?.access_token;
  const email = session?.user?.email;

  // Check if the session token is still valid!
  // If not redirect user to signIn
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const error = data.error;
    const invalidToken =
      error && error.code == 401 && error.status === "UNAUTHENTICATED";

    if (isAuthRoute && !invalidToken) {
      return NextResponse.redirect(new URL("/emails", request.url));
    }

    if (mailRoute && invalidToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
