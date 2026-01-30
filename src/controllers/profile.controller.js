import * as profileService from "../services/profile.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

export const createProfileController = catchAsync(async (req, res) => {
  const profile = await profileService.createProfileService(
    req.user.id,
    req.body,
  );
  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Profile created",
      total: 1,
      data: profile,
    }),
  );
});

export const getProfileController = catchAsync(async (req, res) => {
  const profile = await profileService.getProfileByUserService(req.user.id);
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Profile Fetched",
      total: 1,
      data: profile,
    }),
  );
});
export const updateProfileController = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfileService(
    req.user.id,
    req.body,
  );
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Profile updated",
      total: 1,
      data: profile,
    }),
  );
});
export const deleteProfileController = catchAsync(async (req, res) => {
  await profileService.deleteProfileService(req.user.id);
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Profile deleted",
    }),
  );
});
