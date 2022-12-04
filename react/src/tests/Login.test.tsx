import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/users/Login";

describe("Login component tests:", () => {
  const { rerender } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  test("Login form has correct number of inputs", () => {
    rerender(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    expect(emailInput).toHaveAttribute("type", "text");
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
