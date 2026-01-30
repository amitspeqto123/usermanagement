import Joi from "joi";

export const createProfile = {
  body: Joi.object().keys({
    name: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    avatar: Joi.string().uri().allow(""),
  }),
};

export const getMyProfile = {};

export const updateMyProfile = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      phone: Joi.string(),
      address: Joi.string(),
      avatar: Joi.string().uri(),
    })
    .min(1),
};

export const deleteMyProfile = {};
