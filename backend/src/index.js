import "dotenv/config";

import express from "express";
import connectMongoDb from "./configs/mongoDb.config.js";
import cors from "cors"
import cookieParser from "cookie-parser"

import AuthRouter from './modules/auth/auth.route.js';
import UserRouter from './modules/user/routes/user.route.js'
import EventRouter from "./modules/event/routes/event.route.js";
import EventRegistrationRouter from "./modules/registration/routes/registration.route.js"

const App = express();
const PORT = process.env.PORT;

const BaseUrl = "/api"



//config
App.use(express.urlencoded());
App.use(express.json());
App.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    })
);
App.use(cookieParser());

//routes
App.use(BaseUrl, AuthRouter);
App.use(BaseUrl, EventRouter);
App.use(BaseUrl, EventRegistrationRouter);
App.use(BaseUrl, UserRouter);


App.listen(PORT, async (err) =>
{
    if (!err) {
        await connectMongoDb();
        console.log(`Server running at http://localhost:${PORT}`);
    }
})

