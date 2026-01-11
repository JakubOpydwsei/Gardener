import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserModel } from "../models/User"; 
import { asyncHandler } from "../utils/asyncHandler"; 

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const sessionToken = crypto.randomBytes(32).toString('hex');

    const newUser = await UserModel.create({ 
        email, 
        passwordHash,
        sessionToken
    });

    res.status(201).json({ 
        message: "User registered and logged in.", 
        userId: newUser._id,
        email: newUser.email,
        token: sessionToken 
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    user.sessionToken = crypto.randomBytes(32).toString('hex');
    await user.save();

    res.json({ 
        userId: user._id, 
        email: user.email, 
        token: user.sessionToken 
    });
});