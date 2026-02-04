import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// 1. Define which routes are for authentication
const isAuthRoute = createRouteMatcher(["/auth/sign-in"]);

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();
  const isAuthPage = isAuthRoute(req);

  // DEBUG: This will help us see the status in Vercel Logs
  console.log(`PATH: ${req.nextUrl.pathname} | AUTH: ${isAuthenticated}`);

  // 2. If user is logged in and tries to go to sign-in, send to home
  if (isAuthPage && isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/");
  }

  // 3. If user is NOT logged in and NOT on the auth page, send to sign-in
  // (We use !isAuthPage to protect the Home page and all other pages)
  if (!isAuthenticated && !isAuthPage) {
    return nextjsMiddlewareRedirect(req, "/auth/sign-in");
  }
});

export const config = {
  // 4. The Matcher: This tells Next.js exactly which files to IGNORE
  // We added ((?!api|_next/static|_next/image|favicon.ico).*) to ensure 
  // CSS, Images, and API calls never get redirected.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};