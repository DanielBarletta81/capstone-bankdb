const express = require("express");
const mongoose = require('mongoose');
const authenticate  = require("../middleware/authenticate");
const firebaseAdmin = require("../firebase") ;
const User = require('../model/user');
const authRouter = express.Router();

authRouter.get("/auth", authenticate, async (req, res) => {
  res.status(200).json(req.user);
});

authRouter.post("/auth/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      error:
        "Invalid request body. Must contain email, password, and username."
    });
  }

  try {
    const newFirebaseUser = await firebaseAdmin.auth.createUser({
      email,
      password
    });

    if (newFirebaseUser) {
      const userCollection = await User.find('users');
      await userCollection.insertOne({
        email,
        username,
        firebaseId: newFirebaseUser.uid
      });
    }
    return res
      .status(200)
      .json({ success: "Account created successfully. Please sign in." });
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      return res
        .status(400)
        .json({ error: "User account already exists at email address." });
    }
    return res.status(500).json({ error: "Server error. Please try again" });
  }
});

module.exports = authRouter;