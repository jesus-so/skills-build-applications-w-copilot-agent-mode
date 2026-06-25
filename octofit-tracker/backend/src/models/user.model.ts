import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  joinedAt: Date;
  team?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: Date.now },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export default mongoose.model<IUser>('User', UserSchema);
