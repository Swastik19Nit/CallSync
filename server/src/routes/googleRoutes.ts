import { Request, Response, Router, NextFunction } from "express";
import passport from "../config/passport";

const router = Router();

router.get('/',
  (req: Request, res: Response, next: NextFunction) => {
    const redirectUrl = passport.authenticate('google', {
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar'],
      accessType: 'offline',
      prompt: 'consent'
    });

    return redirectUrl(req, res, next);
  }
);

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.redirect('https://collab-black.vercel.app/auth/google/failure');
    }
    res.redirect(`https://collab-black.vercel.app/home/event-types?profilePicture=${req.user.profilePicUrl}&firstName=${req.user.firstName}`);
  }
);

router.get('/failure', (_: Request, res: Response) => {
  res.redirect('https://collab-black.vercel.app');
});

export { router as googleAuthRoutes };
