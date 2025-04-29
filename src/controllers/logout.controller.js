import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logoutController = asyncHandler(async (req, res) => {
  if (!req.user)
    return res.status(400).json(new ApiError(400, "The user isnt logged in"));
  req.logout((error) => {
    if (error) {
      return res.status(400).json(new ApiError(400, error));
    }
    //destroy session
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(400)
          .json(new ApiError(400, "Error destroying session"));
      }
    });
    //clear cookie
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    return res.status(200).json(new ApiResponse(200, "Logout successfull"));
  });
});

export { logoutController };
