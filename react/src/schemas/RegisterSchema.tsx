import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().min(2).max(255).required("Required"),
  password: Yup.string()
    .min(8)
    .max(100)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  firstName: Yup.string().min(1).max(100).required("Required"),
  lastName: Yup.string().min(1).max(100).required("Required"),
  dob: Yup.date()
    .max(new Date().toLocaleDateString(), "You aren't born yet..")
    .required("Required"),
  avatarUrl: Yup.string().url().required("Required"),
  termsAgree: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions."
  ),
});
