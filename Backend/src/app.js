const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    }),
);

/**
 * Required Routes
 */

const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/posts.route");
const userRouter = require("./routes/user.routes");

/**
 * Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
