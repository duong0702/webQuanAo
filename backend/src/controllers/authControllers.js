import { registerService, loginService } from "../services/authServices.js";

import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      message: "Register success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req.body);

    const token = generateToken(user._id);

    res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
