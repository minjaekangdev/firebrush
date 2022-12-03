import { useContext } from "react";
import { Formik, Field, FormikValues, Form } from "formik";
import netUserService from "../../services/userService";
import { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import logo from "../../assets/images/logo2.png";
import "../../assets/css/landing.css";
import { UserContext } from "../../contexts/UserContext";

function Login() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onLoginSuccess = (response: AxiosResponse) => {
    navigate("/");
    toastr.success("You are now logged in.");
    const user = { ...currentUser };
    user.isLoggedIn = true;
    setCurrentUser(user);
  };
  const onLoginError = (error: AxiosError) => {
    toastr.error("Error!");
    console.log(error);
  };

  function onSubmit(values: FormikValues): void {
    netUserService.login(values).then(onLoginSuccess).catch(onLoginError);
  }
  return (
    <div className="landing-bg">
      <div className="container border-1 rounded">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-4">
                  <img src={logo} alt="logo" className="img-fluid center" />
                  <h1>Login</h1>
                  <span>
                    Don't have an account?{" "}
                    <Link to="/register">Register here!</Link>
                  </span>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={onSubmit}
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-12 mb-3">
                          <label htmlFor="email">Email</label>
                          <Field
                            name="email"
                            type="text"
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

export default Login;
