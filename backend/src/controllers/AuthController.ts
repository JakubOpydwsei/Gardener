import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserModel } from "../models/User"; 
import { asyncHandler } from "../utils/asyncHandler"; 

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ error: "User with this username already exists." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const sessionToken = crypto.randomBytes(32).toString('hex');

    const newUser = await UserModel.create({ 
        username, 
        passwordHash,
        sessionToken
    });

    res.status(201).json({ 
        message: "User registered and logged in.", 
        userId: newUser._id,
        token: sessionToken 
    });
});


export const login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid username or password" });
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    user.sessionToken = sessionToken;
    await user.save();
    
    res.json({ 
        token: sessionToken, 
        userId: user._id, 
        username: user.username 
    });
});