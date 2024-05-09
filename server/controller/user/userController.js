const ErrorHandler = require("../../utils/errorHandler");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { sendMail } = require("../../utils/emailUtils");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

exports.userLogin = asyncErrorHandler(async (req, res, next) => {
  // Retrieve email and password from request body
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorHandler(400, "Please provide email and password"));
  }
  // Find the user with the provided email and populate the role
  const user = await User.findOne({ email }).select("+password");
  // Check if user with the provided email exists
  if (!user) {
    return next(new ErrorHandler(401, "Invalid credentials"));
  }

  let FetchedUser = user;

  // Compare the provided password with the hashed password using the schema method
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return next(new ErrorHandler(401, "Invalid credentials"));
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const userIDpayLoad = {
    id: FetchedUser._id,
  };

  const AuthToken = jwt.sign(userIDpayLoad, process.env.JWT_SECRET);
  res.status(200).cookie("AuthToken", AuthToken, cookieOptions).json({
    success: true,
    user: FetchedUser,
    accessToken: AuthToken,
  });
});

exports.logout = asyncErrorHandler(async (req, res, next) => {
  // clear the cookie of the user
  res.cookie("AuthToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "User Logout Successfully" });
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return next(new ErrorHandler(400, "Please provide an email"));
  }

  const userExists = await User.exists({ email });

  if (!userExists) {
    return next(new ErrorHandler(404, "User not found"));
  }

  const passwordResetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  try {
    await sendMail(
      email,
      "Password Reset",
      `Click the link to reset your password: http://localhost:3031/auth/jwt/password-reset?token=${passwordResetToken}`
    );
    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    return next(new ErrorHandler(500, "Failed to send password reset email"));
  }
});

exports.userCreate = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation: Check if required fields are provided
  if (!name || !email || !password) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Check if the email already exists
  const existingUser = await User.exists({ email });
  if (existingUser) {
    // Email already exists, return an error
    return next(new ErrorHandler(400, "Email already exists"));
  }
  // Create the new user
  const newUser = new User({
    name,
    email,
    password,
  });

  // Save the new user to the database
  const savedUser = await newUser.save();
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: savedUser,
  });
});

exports.updateUserPassword = asyncErrorHandler(async (req, res, next) => {
  const { token, password } = req.body;

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new ErrorHandler(401, "Invalid or expired token"));
    }
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
});

exports.userUpdate = asyncErrorHandler(async (req, res, next) => {
  const { id, name, email, role } = req.body;
  const user_photo = req.imagePath || null;

  // Validation: Check if required fields are provided
  if (!id || !name || !email || !role) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Find the user by ID and update their data
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      role,
    },
    { new: true }
  );

  // Check if the user was found and updated
  if (!updatedUser) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const { id, oldPassword, newPassword } = req.body;

  if (!id || !newPassword) {
    return next(
      new ErrorHandler(400, "Please provide user ID and new password")
    );
  }

  const existingUser = await User.findById(id).select("+password");
  if (!existingUser) {
    return next(new ErrorHandler(404, "User not found"));
  }

  if (oldPassword) {
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Incorrect old password"));
    }
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(id, { password: hashedNewPassword });

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

exports.loadUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "User ID not provided" });
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
});

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const userId = req.query.id;
  const fields = req.query.fields;

  if (userId) {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: mapUser(user) });
  } else if (fields) {
    const users = await User.find().select("name _id").lean();
    const updatedData = users.map(({ _id, name, ...rest }) => ({
      id: _id.toString(),
      name: name,
      ...rest,
    }));
    res.status(200).json({ success: true, users: updatedData });
  } else {
    const users = await User.find().populate("role_id", "name");
    res.status(200).json({ success: true, users: users.map(mapUser) });
  }
});

// Function to map _id to id and include role name
function mapUser(user) {
  return {
    ...user.toJSON(),
    id: user._id,
    role: user.role,
  };
}

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  // Retrieve user ID from request query parameters
  const userId = req.query.id;

  // Validate user ID
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide user ID" });
  }

  // Find the user by ID and delete it
  const user = await User.findByIdAndDelete(userId);

  // Check if the user was found and deleted
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});
