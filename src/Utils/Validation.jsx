import * as Yup from "yup";

// Validation schemas
export const loginSchema = Yup.object({
emailId: Yup.string().email("Invalid email").required("Required"),
password: Yup.string().required("Required"),
});

export const signupSchema = Yup.object({
firstName: Yup.string().required("Required"),
lastName: Yup.string().required("Required"),
emailId: Yup.string().email("Invalid email").required("Required"),
password: Yup.string().required("Required"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  age: Yup.number().required("Required").min(1, "Invalid age"),
  gender: Yup.string().required("Required"),
  about: Yup.string().max(200, "Max 200 characters"),
  photo: Yup.mixed(),
});