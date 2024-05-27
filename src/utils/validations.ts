import * as Yup from "yup";

// --------------------- AUTH ---------------------------
// signup
export const signUpValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
});
// signin
export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});
// verify password
export const verifyPassValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
// update password
export const updatePassValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  code: Yup.string().required(),
});

// ----------------------------- PRODUCTS -----------------------------
// create product
export const validationSchemaProductCreate = Yup.object().shape({
  age_max: Yup.number()
    .required("Max Age is required")
    .positive("Age must be a positive number"),
  age_min: Yup.number()
    .required("Min Age is required")
    .positive("Age must be a positive number"),
  category_id: Yup.string().required("Category ID is required"),
  color: Yup.string().required("Color is required"),
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be a positive number"),
  count: Yup.number()
    .required("Count is required")
    .positive("Count must be a positive number"),
  discount: Yup.number()
    .required("Discount is required")
    .positive("Discount must be a positive number"),
  for_gender: Yup.string().required("For Gender is required"),
  made_in: Yup.string().required("Made In is required"),
  product_name: Yup.string().required("Product Name is required"),
  size: Yup.number()
    .required("Size is required")
    .positive("Size must be a positive number"),
  description: Yup.string().required("Description is required"),
});
// ----------------------------- PRODUCTS -----------------------------

// ----------------------------- WORKER -------------------------------
// add worker
export const validationSchemaWorkerAdd = Yup.object().shape({
  age: Yup.string().required("Age is required"),
  phone_number: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  gender: Yup.string().required("Gender is required"),
  last_name: Yup.string().required("Last Name is required"),
  password: Yup.string().required("Password is required"),
});

// edit worker
export const validationSchemaWorkerEdit = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  gender: Yup.string().required("Gender is required"),
  last_name: Yup.string().required("Last Name is required"),
  password: Yup.string().required("Password is required"),
  phone_number: Yup.string()
    .min(19, "Phone invalit ")
    .required("Phone is required"),
  age: Yup.number().required("Age is required"),
  id: Yup.string().required("ID is required"),
});
// ----------------------------- WORKER -------------------------------
