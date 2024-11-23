const express = require("express");
const router = express.Router();

const {
  findProgrammingService,
} = require("../controllers/programmingController");

const jwtMiddleware = require("../middlewares/jwtMiddleware");

// // POST /api/register (Register a new user)
// router.post("/register", registerUser);

// // POST /api/login (User login)
// router.post("/login", loginUserHandler);

router.post("/programming/playground", jwtMiddleware.verifyAccessToken, findProgrammingService);
// router.get("/pause", jwtMiddleware.verifyAccessToken, pausePlayGround);


module.exports = router;
