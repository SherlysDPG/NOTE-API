import { Schema, Types, model } from 'mongoose';

const noteSchema = new Schema(
  {
    author: { type: Types.ObjectId },
    title: { type: String },
    content: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Notes', noteSchema);
