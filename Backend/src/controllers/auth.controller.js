const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password, bio, profilePicture } = req.body;

    // const userExistsByEmail = await userModel.findOne({ email });
    // if (userExistsByEmail) {
    //     return res.status(409).json({ message: "Email already exists" });
    // }

    // const userExistsByUsername = await userModel.findOne({ username });
    // if (userExistsByUsername) {
    //     return res.status(409).json({ message: "Username already exists" });
    // }

    //OR

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserExists) {
        return res.status(409).json({
            message:
                "Username or Email already exists" +
                (isUserExists.email == email
                    ? "Email already exists"
                    : "Username already exists"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profilePicture,
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
        },
    });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found!",
        });
    }

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) {
        return res.status(401).json({
            message: "Invalid credentials!",
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

    res.cookie("token", token);
    res.status(200).json({
        message: "Login successful!",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
        },
    });
}

async function getMe(req, res) {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    res.status(200).json({
        message: "User fetched successfully!",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
        },
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
