import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/custom";


interface JwtPayload {
  _id: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required. Please log in to continue."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    req.user = await User.findById(decoded._id).select("-password").lean() as IUser;
    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "User not found or access denied."
      });
    }
    next();
  } catch (err) {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0)
    });
    return res.status(401).json({
      status: "error",
      message: "Authentication invalid or expired. Please log in again."
    });
  }
};

