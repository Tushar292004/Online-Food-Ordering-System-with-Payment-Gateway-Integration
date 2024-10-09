import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true,
        transform: function (doc, ret) {
            // Remove sensitive fields before sending the user object to the client
            delete ret.password; // Remove password
            delete ret.__v; // Remove version key
            return ret;
        }
    }
});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

export const UserModel = model<User>('user', UserSchema);