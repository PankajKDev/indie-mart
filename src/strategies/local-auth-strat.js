import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";

passport.serializeUser((user, done) => {
  console.log(`serialize:${user}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`deserialize:${id}`);
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new ApiError(401, "user not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  //passing an instance of strategy
  new Strategy((username, password, done) => {
    console.log(`Username : ${username}`);
    console.log(`Password : ${password}`);
    //finding and verifying user
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new ApiError(404, "User not found");
      if (findUser.password !== password) {
        throw new ApiError(401, "Invalid credentials");
      }
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
