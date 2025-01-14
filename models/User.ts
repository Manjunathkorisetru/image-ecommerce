import { Schema, model, models } from "mongoose";
import bbcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  role: "user" | "admin";
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bbcrypt.hash(
      this.password,
      10
    );
  }
  next();
});

const User =
  models?.User ||
  model<IUser>("User", UserSchema);

export default User;
