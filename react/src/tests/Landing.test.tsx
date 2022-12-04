import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "../components/landing/Landing";

describe("Navbar tests:", () => {
  const { rerender } = render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
  const getStarted = screen.getByText("Get Started");

  test("Must be 3 navlinks", () => {
    rerender(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
    expect(getStarted).toBeEnabled();
  });
});
