const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUserHandler,
} = require("../controllers/userController");
const PORT=require('../index');
const {
  spinPlayGround,
  pausePlayGround,
} = require("../controllers/containerControllers");

const jwtMiddleware = require("../middlewares/jwtMiddleware");

// POST /api/register (Register a new user)
router.post("/register", registerUser);

// POST /api/login (User login)
router.post("/login", loginUserHandler);

router.get("/playground", jwtMiddleware.verifyAccessToken, spinPlayGround);
router.get("/pause", jwtMiddleware.verifyAccessToken, pausePlayGround);


module.exports = router;
