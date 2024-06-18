import Joi from "joi";
import { IOtp, ISignIn, IUser } from "../types";

export const validation = {
  checkEmail: Joi.object({
    email: Joi.string()
      .email({ tlds: false })
      .label("email")
      .messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." })
      .required(),
  }),

  checkSignup: Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z]+$/, "alphabet characters")
      .min(2)
      .label("firstName")
      .max(30)
      .required()
      .messages({
        "string.pattern.name": "First name must only contain alphabet characters",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must be less than or equal to 30 characters long",
        "any.required": "First name is required",
      })
      .required(),

    lastName: Joi.string()
      .pattern(/^[a-zA-Z]+$/, "alphabet characters")
      .min(2)
      .label("lastName")
      .max(30)
      .required()
      .messages({
        "string.pattern.name": "Last name must only contain alphabet characters",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must be less than or equal to 30 characters long",
        "any.required": "Last name is required",
      })
      .required(),

    phoneNumber: Joi.string()
      .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
      .label("phoneNumber")
      .required()
      .messages({
        "string.pattern.name": "Phone number must be a valid Nigerian phone number",
        "string.base": "Phone number must be a string",
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required",
      })
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"))
      .label("password")
      .required()
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "any.required": "Password is required",
      })
      .required(),
  }),

  checkPhoneNumber: (phoneNumber: string) => {
    return Joi.string()
      .pattern(/^\d+$/)
      .messages({
        "string.pattern.base": "Phone number must contain only digits.",
        "string.empty": "Phone number is required.",
      })
      .validate(phoneNumber);
  },

  checkSignIn: Joi.object({
    email: Joi.string()
      .email({ tlds: false })
      .label("email")
      .messages({ "string.empty": "Email is required.", "string.email": "Email must be a valid email." })
      .required(),
    password: Joi.string().label("password").min(5).required(),
  }),

  checkOtp: Joi.object({
    otp: Joi.string()
      .pattern(/^\d{6}$/, "numeric")
      .label("otp")
      .required()
      .messages({
        "string.pattern.name": "OTP must be a 6-digit number",
        "string.base": "OTP must be a string",
        "string.empty": "OTP is required",
        "any.required": "OTP is required",
      }),
  }),

  checkPasswords: Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"))
      .label("password")
      .required()
      .messages({
        "string.pattern.name":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),

    confirmPassword: Joi.any().equal(Joi.ref("password")).required().label("confirmPassword").messages({
      "any.only": "Confirm password does not match password",
      "any.required": "Confirm password is required",
    }),
  }),

  signup: (signup: IUser) => {
    return Joi.object({
      firstName: Joi.string()
        .pattern(/^[a-zA-Z]+$/, "alphabet characters")
        .min(2)
        .max(30)
        .required()
        .messages({
          "string.pattern.name": "First name must only contain alphabet characters",
          "string.min": "First name must be at least 2 characters long",
          "string.max": "First name must be less than or equal to 30 characters long",
          "any.required": "First name is required",
        }),
      lastName: Joi.string()
        .pattern(/^[a-zA-Z]+$/, "alphabet characters")
        .min(2)
        .max(30)
        .required()
        .messages({
          "string.pattern.name": "Last name must only contain alphabet characters",
          "string.min": "Last name must be at least 2 characters long",
          "string.max": "Last name must be less than or equal to 30 characters long",
          "any.required": "Last name is required",
        }),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      // phoneNumber: Joi.string()
      //   .pattern(/^\+?[1-9]\d{1,14}$/, "phone number")
      //   .required()
      //   .messages({
      //     "string.pattern.name": "Phone number must be a valid international phone number",
      //     "string.base": "Phone number must be a string",
      //     "string.empty": "Phone number is required",
      //     "any.required": "Phone number is required",
      //   }),
      phoneNumber: Joi.string()
        .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
        .required()
        .messages({
          "string.pattern.name": "Phone number must be a valid Nigerian phone number",
          "string.base": "Phone number must be a string",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),
      address: Joi.object({
        street: Joi.string().min(5).max(100).required().messages({
          "string.base": "Street must be a string",
          "string.empty": "Street is required",
          "string.min": "Street must be at least 5 characters long",
          "string.max": "Street must be less than or equal to 100 characters long",
          "any.required": "Street is required",
        }),
        state: Joi.string().min(2).max(50).required().messages({
          "string.base": "State must be a string",
          "string.empty": "State is required",
          "string.min": "State must be at least 2 characters long",
          "string.max": "State must be less than or equal to 50 characters long",
          "any.required": "State is required",
        }),
        country: Joi.string().min(2).max(50).required().messages({
          "string.base": "Country must be a string",
          "string.empty": "Country is required",
          "string.min": "Country must be at least 2 characters long",
          "string.max": "Country must be less than or equal to 50 characters long",
          "any.required": "Country is required",
        }),
      })
        .required()
        .messages({
          "object.base": "Address must be an object",
          "any.required": "Address is required",
        }),

      nin: Joi.string().min(11).max(11).required(),
      currency: Joi.string()
        .pattern(/^[A-Z]{3}$/, "currency code")
        .required()
        .messages({
          "string.pattern.name": "Currency must be a valid ISO 4217 currency code (3 uppercase letters)",
          "string.base": "Currency must be a string",
          "string.empty": "Currency is required",
          "any.required": "Currency is required",
        }),
    }).validate(signup);
  },

  forgotPassword: (forgotPassword: IUser) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(forgotPassword);
  },

  resetPassword: (payload: IOtp) => {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      otp: Joi.string().min(6).required(),
    }).validate(payload);
  },
};

export default validation;
