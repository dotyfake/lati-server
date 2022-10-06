const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  // @route /POST/ api/auth/register
  // @desc register user
  async register(req, res) {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password!" });

    try {
      const user = await User.findOne({ username: username });

      // Check username already taken
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Username already taken!" });

      // Created user
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
