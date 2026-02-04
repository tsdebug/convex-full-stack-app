import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// 1. Define which routes are public (sign-in, sign-up, etc.)
const isPublicPage = createRouteMatcher(["/auth/sign-in"]);

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  // 2. If user is on a public page and IS authenticated, go to homepage
  if (isPublicPage(req) && isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/");
  }

  // 3. If user is NOT on a public page and NOT authenticated, go to sign-in
  if (!isPublicPage(req) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/auth/sign-in");
  }
});

export const config = {
  // Use the recommended Convex matcher
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};