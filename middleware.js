import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)"

]);

export default clerkMiddleware(async(auth,req)=>{
    const { userId } = await auth();

    // If no userId Present and is a protected route, redirect to sign in page
    if(!userId && isProtectedRoute(req)){
    const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// Here we are pasting the code from Clerk documentation for middleware
// Also if user is logged out and try to access a protected route, it will redirect to sign in page

// /dashboard(.*) -> means all routes that starts with /dashboard and whatever after dashboard will be protected