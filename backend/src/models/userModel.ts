import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>("User", UserSchema);
