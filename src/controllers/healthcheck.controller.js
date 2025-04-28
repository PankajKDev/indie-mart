import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const healthcheck = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "Everything is fine"));
  } catch (error) {
    throw new ApiError(400, "Critical Health", error);
  }
});

export { healthcheck };
