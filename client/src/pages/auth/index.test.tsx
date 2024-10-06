import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Auth from ".";

describe("Auth", () => {
  test("renders a signUp form on load", () => {
    render(<Auth />);
    const signUpForm = screen.getByRole("form", { name: /sign-up/i });
    expect(signUpForm).toBeInTheDocument();
  });

  test("clicking the login tab renders the login form", () => {
    render(<Auth />);
    const loginTab = screen.getByText(/login/i, { selector: "button" });
    fireEvent.click(loginTab);
    const loginForm = screen.getByRole("form", { name: /login/i });
    expect(loginForm).toBeInTheDocument();
  });

  test("clicking the signup tab renders the signup form", () => {
    render(<Auth />);
    const signUpTab = screen.getByText(/signup/i, { selector: "button" });
    fireEvent.click(signUpTab);
    const signUpForm = screen.getByRole("form", { name: /signup/i });
    expect(signUpForm).toBeInTheDocument();
  });
});
