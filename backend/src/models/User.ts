import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
    email: string;
    passwordHash: string;
    sessionToken?: string;
    favoritePlants: Types.ObjectId[];  
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<User>({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Wprowadzony email jest nieprawidłowy']
 },
    passwordHash: { type: String, required: true },
    sessionToken: { type: String, unique: true, sparse: true },
    favoritePlants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plant',
            default: []
        }
    ] 
});

UserSchema.methods.comparePassword = async function(password: string) {
    return bcrypt.compare(password, this.passwordHash);
};

export const UserModel = model<User>('User', UserSchema);