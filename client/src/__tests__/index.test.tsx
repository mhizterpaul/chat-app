import React from "react";
import { render, screen } from "@testing-library/react";
import Auth from ".";
import userEvent from "@testing-library/user-event";

describe("Auth", () => {
  test("renders a signUp form on load", () => {
    render(<Auth />);
    const signUpForm = screen.getByRole("form", { name: /signup/i });
    expect(signUpForm).toBeInTheDocument();
  });

  test("clicking the login tab renders the login form", () => {
    render(<Auth />);
    const loginTab = screen.getByLabelText("Login", { selector: "button" });
    userEvent.click(loginTab);
    const loginForm = screen.getByRole("form", { name: /login/i });
    expect(loginForm).toBeInTheDocument();
  });

  test("clicking the signup tab renders the signup form", () => {
    render(<Auth />);
    const signUpTab = screen.getByLabelText("Signup", { selector: "button" });
    userEvent.click(signUpTab);
    const signUpForm = screen.getByRole("form", { name: /signup/i });
    expect(signUpForm).toBeInTheDocument();
  });
});
