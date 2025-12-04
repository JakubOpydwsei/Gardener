import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
    username: string;
    passwordHash: string;
    sessionToken?: string; 
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    sessionToken: { type: String, unique: true, sparse: true } 
});

UserSchema.methods.comparePassword = async function(password: string) {
    return bcrypt.compare(password, this.passwordHash);
};

export const UserModel = model<User>('User', UserSchema);