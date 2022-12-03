import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import netUserService from "../../services/userService";
import { AxiosResponse, AxiosError } from "axios";
import toastr from "toastr";
import "../../assets/css/navbar.css";
import { defaultUser } from "../../constants/Defaults";

function NavbarLanding() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onLogOutSuccess = (response: AxiosResponse) => {
    setCurrentUser(defaultUser);
    toastr.success("You have been signed out.", "Success!");
  };

  const onLogOutError = (error: AxiosError) => {
    toastr.error("An error occured..", "Error!");
  };

  const onSignOut = () => {
    netUserService.logout().then(onLogOutSuccess).catch(onLogOutError);
  };
  const onMyEventsClick = () => {
    navigate("/myevents");
  };

  const QuickMenu = () => {
    return (
      <>
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="rounded-circle border-bottom-0"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <img
                alt="avatar"
                src={currentUser.avatarUrl}
                className="rounded-circle"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  width: "40px",
                }}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dashboard-dropdown dropdown-menu-end py-0 rounded"
            aria-labelledby="dropdownUser"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="container">
                  <img
                    alt="avatar"
                    src={currentUser.avatarUrl}
                    className="rounded-circle"
                    style={{
                      maxHeight: "40px",
                      maxWidth: "40px",
                      height: "auto",
                      width: "40px",
                    }}
                  />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">
                    {currentUser.firstName} {currentUser.lastName}
                  </h5>
                  <p className="mb-0 text-muted">{currentUser.email}</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2" onClick={onMyEventsClick}>
              My Events
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="mb-3" onClick={onSignOut}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };
  return (
    <>
      <Navbar bg="warning" sticky="top" className="shadow my-nav">
        <Container>
          <Nav className="me-auto">
            <Link to="/" className="navbar-link mx-2">
              Home
            </Link>
            <Link to="/events" className="navbar-link">
              Events
            </Link>
          </Nav>

          <div className="navbar-right">
            <span
              className={`ms-auto mt-3 mt-lg-0  ${
                currentUser.isLoggedIn ? "d-none" : ""
              }`}
            >
              <Link
                to="/login"
                className="btn btn-outline-light me-2 navbar-buttons"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-light navbar-buttons"
              >
                Sign Up
              </Link>
            </span>

            <span className={`${currentUser.isLoggedIn ? "d-flex" : "d-none"}`}>
              <QuickMenu />
            </span>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarLanding;
