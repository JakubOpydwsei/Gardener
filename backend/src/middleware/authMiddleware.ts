import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import { Document } from "mongoose";


export interface AuthRequest extends Request {
    userId?: string; 
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access denied. Invalid or missing authorization header." });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    try {
       const user: (Document & { _id: any }) | null = await UserModel.findOne({ sessionToken: token });
        if (!user) {
             return res.status(401).json({ error: "Invalid or unauthorized session." });
        }
        
        req.userId = user._id.toString(); 
        next();
    } catch (ex) {
        res.status(500).json({ error: "Server authentication error." });
    }
};