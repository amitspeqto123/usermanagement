import { Profile } from "../models/profile.model.js";
import ApiError from "../utils/ApiError.js";

export const createProfileService = async (userId, data) => {
  const existing = await Profile.findOne({ userId });
  if (existing) throw new ApiError(400, "Profile already exists");

  const profile = await Profile.create({ userId, ...data });
  return profile;
};

export const getProfileByUserService = async (userId) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) throw new ApiError(404, "Profile not found");
  return profile;
};

export const updateProfileService = async (userId, data) => {
  const profile = await Profile.findOneAndUpdate({ userId }, data, {
    new: true,
  });
  if (!profile) throw new ApiError(404, "Profile not found");
  return profile;
};

export const deleteProfileService = async (userId) => {
  const profile = await Profile.findOneAndDelete({ userId });
  if (!profile) throw new ApiError(404, "Profile not found");
  return profile;
};
