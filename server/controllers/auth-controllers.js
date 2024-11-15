// controllers/auth-controllers.js

const User = require("../models/user-model");

// =============================
// Register Controller
// =============================
const Register = async (req, res, next) => {
  try {
    // Check if a user already exists with the same phone or email
    const existingUser = await User.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Phone number or Email already exists" });
    }

    // Destructure the incoming data from request body
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      state,
      city,
      isAdmin
    } = req.body;

    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Create a new user without confirmPassword
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password, // The password will be hashed in the User model's pre-save hook
      dateOfBirth: {
        day: dateOfBirth.day,
        month: dateOfBirth.month,
        year: dateOfBirth.year,
      },
      gender,
      state,
      city,
      isAdmin,
    });

    // Save the user to the database
    await newUser.save();

    console.log("Registration Successful", newUser);
    res.status(201).json({
      message: "Registration Successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Registration Error", error);
    res.status(400).json({
      message: "User registration failed",
      extraDetails: error.message || "An unexpected error occurred",
    });
    next(error);
  }
};

// =============================
// Login Controller
// =============================
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    // Check if the password matches
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email or Password is incorrect" });
    }

    console.log("Login Successful", user);
    res.status(200).json({
      message: "Login Successful",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Login Error", error);
    next(error);
  }
};

module.exports = { Register, Login };
