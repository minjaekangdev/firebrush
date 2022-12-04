import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../contexts/UserContext";

describe("Navbar User tests:", () => {
  const currentUser = {
    id: 3123,
    email: "hey1234@email.com",
    firstName: "myname",
    lastName: "mylname",
    avatarUrl: "https://google.com",
    dob: "1995-11-24",
    isLoggedIn: true,
  };
  const setCurrentUser = () => {};
  const { rerender } = render(
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
      </UserContext.Provider>
    </BrowserRouter>
  );
  const signup = screen.getByTestId("signin-up");

  test("Sign up and sign in buttons should be hidden", () => {
    rerender(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(signup).toHaveClass("d-none");
  });
});
