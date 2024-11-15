// auth-validator.js
const { z } = require("zod");

const loginSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .email({ message: "Invalid email address" })
  .min(3, { message: "Email must be at least 3 characters" })
  .max(255, { message: "Email must not exceed 255 characters" })
  .toLowerCase()
  .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password can't exceed 100 characters" })
})

const signUpSchema =  z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name cannot be empty" })
    .trim(),
  
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name cannot be empty" })
    .trim(),
  
  phone: z
    .string({ required_error: "Phone number is required" })
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" })
    .trim(),
  email: z
  .string({ required_error: "Email is required" })
  .email({ message: "Invalid email address" })
  .min(3, { message: "Email must be at least 3 characters" })
  .max(255, { message: "Email must not exceed 255 characters" })
  .toLowerCase()
  .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password can't exceed 100 characters" }),

  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .min(6, { message: "Confirm password must be at least 6 characters long" })
    .max(100, { message: "Confirm password can't exceed 100 characters" }),

  dateOfBirth: z.object({
    day: z
      .number({ required_error: "Day is required" })
      .int()
      .min(1, { message: "Day must be between 1 and 31" })
      .max(31, { message: "Day must be between 1 and 31" }),
    month: z
      .number({ required_error: "Month is required" })
      .int()
      .min(1, { message: "Month must be between 1 and 12" })
      .max(12, { message: "Month must be between 1 and 12" }),
    year: z
      .number({ required_error: "Year is required" })
      .int()
      .min(1900, { message: "Year must be a valid year" })
      .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  }),

  gender: z
    .enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),

  state: z
    .string({ required_error: "State is required" })
    .min(1, { message: "State cannot be empty" }),

  city: z
    .string({ required_error: "City is required" })
    .min(1, { message: "City cannot be empty" }),

  isAdmin: z
    .boolean()
    .optional(), // Defaults to false if not provided
});

// Validate password and confirmPassword match
signUpSchema.refine(data => data.password === data.confirmPassword, {
  message: "Password and confirm password must match",
  path: ["confirmPassword"],
});


module.exports = { signUpSchema,loginSchema };
