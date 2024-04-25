import * as Yup from "yup";

export const manageProductSchema = Yup.object().shape({
  email_phone: Yup.string()
    .email("Invalid email format")
    .required("Email address is required."),
  password: Yup.string().required("Password is required."),
  Type: Yup.string().required("Type is required."),
  // .matches(
  //   /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
  //   "Password must contain at least 8 characters, one letter and one number."
  // ),
});
