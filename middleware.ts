import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();
  
  // ADD THIS LINE:
  console.log("BOUNCER CHECK:", { path: req.nextUrl.pathname, loggedIn: isAuthenticated });

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage && isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/");
  }

  if (!isAuthPage && !isAuthenticated) {
    return nextjsMiddlewareRedirect(req, "/auth/sign-in");
  }
});