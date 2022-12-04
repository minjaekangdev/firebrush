import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/users/Register";

describe("Register component tests:", () => {
  const { rerender } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  test("Register form should have all fields properly rendered", () => {
    rerender(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("firstName")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("lastName")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("dob")).toHaveAttribute("type", "date");
    expect(screen.getByLabelText("avatarUrl")).toHaveAttribute("type", "url");
    expect(screen.getByLabelText("email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("password")).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByLabelText("passwordConfirm")).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByLabelText("termsAgree")).toHaveAttribute(
      "type",
      "checkbox"
    );
  });
});
