import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/login', '/profile', '/api/organization', '/api/orgMetaData', '/api/onboardingMail','/api/supportMail', '/terms-of-use', '/privacy-policy', '/license-agreement'],
  afterAuth(auth, req, evt) {  
    if (!auth.userId && !auth.isPublicRoute ) {      
      return redirectToSignIn({ returnBackUrl: req.url });      
    }
  }  
}); 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};