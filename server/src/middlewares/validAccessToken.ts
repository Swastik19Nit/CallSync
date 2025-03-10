import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import refreshAccessToken from "../utils/refreshAccessToken";

const ensureValidAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Checking user authentication...");
  console.log("User:", req.user);

  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  console.log("User Google Access Token:", user.googleAccessToken);

  if (!user.googleAccessToken) {
    return res.status(401).json({ message: "Access token is missing." });
  }

  const decodedToken = jwt.decode(user.googleAccessToken) as JwtPayload;
  if (!decodedToken || (decodedToken.exp as number) * 1000 < Date.now()) {
    try {
      console.log("Access token expired, refreshing...");
      const refreshedAccessToken = await refreshAccessToken(user.googleRefreshToken);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { googleAccessToken: refreshedAccessToken },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update user." });
      }

      console.log("Access token refreshed successfully.");
      next();
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(401).json({ message: "Failed to refresh access token." });
    }
  } else {
    console.log("Access token is still valid.");
    next();
  }
};


export default ensureValidAccessToken;

