import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import HealthRoute from "./routes/healthcheck.routes.js";
import AuthRoute from "./routes/auth.route.js";
import session from "express-session";
import passport from "passport";
import "./strategies/local-auth-strat.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, //this is one hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/api/v1/health", HealthRoute);
app.use("/api/v1/auth", AuthRoute);
app.get("/api/status", (req, res) => {
  console.log(req.user);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});
export { app };
