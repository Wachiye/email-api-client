import Joi from "joi";
import {
  CreateEmailPayload,
  FilterEmailsPayload,
  UpdateEmailPayload,
} from "./email-dto.interface";

export const createEmailSchema = Joi.object<CreateEmailPayload>({
  sender: Joi.string().required().messages({
    "string.empty": "Sender cannot be empty",
    "any.required": "Sender  is required",
  }),
  recipient: Joi.string().required().messages({
    "string.empty": "Recipient cannot be empty",
    "any.required": "Recipient is required",
  }),
  subject: Joi.string().optional().allow(null),
  content: Joi.string().max(4000).optional().allow(null).messages({
    "string.max": "Content must be at most 4000 characters long",
  }),
});

export const filterEmailsSchema = Joi.object<FilterEmailsPayload>({
  id: Joi.string().optional().messages({
    "string.empty": "ID cannot be empty",
    "any.required": "ID is required",
  }),
 
  search: Joi.string().optional().messages({
    "string.empty": "Search cannot be empty",
  }),
  read: Joi.boolean().optional().messages({
    "boolean.base": "Read must be a boolean",
  }),
  page: Joi.number().integer().min(1).optional().messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
  }).default(1),
  limit: Joi.number().integer().min(1).optional().messages({
    "number.base": "Read must be a number",
    "number.min": "Limit must be at least 1",
  }).default(10),
});

export const updateEmailSchema = Joi.object<UpdateEmailPayload>({
  emailId: Joi.string().required().messages({
    "string.empty": "Email ID cannot be empty",
    "any.required": "Email ID is required",
  }),
  read: Joi.boolean().required().messages({
    "boolean.base": "Read must be a boolean",
    "any.required": "Password is required",
  }),
});
