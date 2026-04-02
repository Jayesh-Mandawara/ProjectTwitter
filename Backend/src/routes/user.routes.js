const express = require("express");
const {
    followUserController,
    unfollowUserController,
    acceptFollowController,
    rejectFollowController,
    getPendingRequestsController,
} = require("../controllers/user.controller");

const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, followUserController);
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);
userRouter.post("/accept/:username", identifyUser, acceptFollowController);
userRouter.post("/reject/:username", identifyUser, rejectFollowController);
userRouter.get("/pending", identifyUser, getPendingRequestsController);

module.exports = userRouter;
