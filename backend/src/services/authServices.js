import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerService = async (data) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  return User.create({
    name,
    email,
    password: hash,
  });
};

export const loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Wrong password");
  }

  return user;
};
