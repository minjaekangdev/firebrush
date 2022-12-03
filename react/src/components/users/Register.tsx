import React from "react";
import { Formik, Form, Field, FormikValues, FormikErrors } from "formik";
import netUserService from "../../services/userService";
import { AxiosError } from "axios";
import toastr from "toastr";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import "../../assets/css/landing.css";

function Register() {
  const navigate = useNavigate();

  const onCreateSuccess = () => {
    navigate("/login");
    toastr.success("You're account has been created!", "Please login");
  };
  const onCreateError = (error: AxiosError) => {
    console.log(error);
    toastr.error("Something went wrong...");
  };
  const onSubmit = (values: FormikValues) => {
    netUserService.create(values).then(onCreateSuccess).catch(onCreateError);
  };

  return (
    <div className="landing-bg">
      <div className="container border-1 rounded">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-4">
                  <img src={logo} alt="logo" className="img-fluid" />
                  <h1>Register</h1>
                  <span>
                    Already have an account?{" "}
                    <Link to="/login">Login here!</Link>
                  </span>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      passwordConfirm: "",
                      dob: "",
                      avatarUrl: "",
                      agreement: false,
                    }}
                    onSubmit={onSubmit}
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-12 mb-3">
                          <label htmlFor="firstName">First Name</label>
                          <Field
                            name="firstName"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="lastName">Last Name</label>
                          <Field
                            name="lastName"
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="email">Birthday</label>
                          <Field
                            name="dob"
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="email">Avatar Url</label>
                          <Field
                            name="avatarUrl"
                            type="url"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="email">Email</label>
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="password">Password</label>
                          <Field
                            name="password"
                            type="password"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="passwordConfirm">
                            Password Confirm
                          </label>
                          <Field
                            name="passwordConfirm"
                            type="password"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <button className="btn btn-primary" type="submit">
                            Login
                          </button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
