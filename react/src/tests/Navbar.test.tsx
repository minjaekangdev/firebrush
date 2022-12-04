import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { UserContext } from "../contexts/UserContext";
import { defaultUser } from "../constants/Defaults";

describe("Navbar no user tests:", () => {
  const { rerender } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const links = screen.getAllByRole("link");
  const quickMenu = screen.getByTestId("quickmenu");

  test("Must be 4 nav links, home, event, signup, sign in", () => {
    const currentUser = defaultUser;
    const setCurrentUser = () => {};
    rerender(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(links).toHaveLength(4);
    expect(quickMenu).toHaveClass("d-none");
  });
});
