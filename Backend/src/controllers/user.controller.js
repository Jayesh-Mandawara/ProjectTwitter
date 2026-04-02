const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followeeUsername === followerUsername) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername,
    });

    if (!isFolloweeExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        $or: [{ status: "pending" }, { status: "accepted" }],
    });

    if (isAlreadyFollowing) {
        return res.status(400).json({
            message: `Already requested or following ${followeeUsername}`,
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `Followed ${followeeUsername} successfully`,
        follow: followRecord,
    });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted",
    });

    if (!isAlreadyFollowing) {
        return res
            .status(200)
            .json({ message: `You are not following ${followeeUsername}` });
    }

    await followModel.findByIdAndDelete(isAlreadyFollowing._id);

    res.status(200).json({
        message: `Unfollowed ${followeeUsername} successfully`,
    });
}

async function acceptFollowController(req, res) {
    const followeeUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending",
    });

    if (!followRequest) {
        return res.status(404).json({ message: "Follow request not found" });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
        message: `Accepted follow request from ${followerUsername}`,
    });
}

async function rejectFollowController(req, res) {
    const followeeUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending",
    });

    if (!followRequest) {
        return res.status(404).json({ message: "Follow request not found" });
    }

    followRequest.status = "rejected";
    await followRequest.save();

    res.status(200).json({
        message: `Rejected follow request from ${followerUsername}`,
    });
}

async function getPendingRequestsController(req, res) {
    const followeeUsername = req.user.username;

    const pendingRequests = await followModel.find({
        followee: followeeUsername,
        status: "pending",
    });

    res.status(200).json({
        message: "Pending follow requests",
        requests: pendingRequests,
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowController,
    rejectFollowController,
    getPendingRequestsController,
};
