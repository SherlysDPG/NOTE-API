import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    verified: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Users', userSchema);
