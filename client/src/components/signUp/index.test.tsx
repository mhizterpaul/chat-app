import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/signUp/signup";

describe("Signup", () => {
  test("renders a signUp form on load", () => {
    render(<Signup />);
    const signUpForm = screen.getByRole("form", { name: /signup/i });
    expect(signUpForm).toBeInTheDocument();
  });
  test("the submit button is disabled on load", () => {
    render(<Signup />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
  test("the submit button is enabled when all fields are filled correctly", async () => {
    render(<Signup />);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByRole("textbox", { name: "password" });
    const confirmPasswordInput = screen.getByRole("textbox", {
      name: /Confirm Password/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await act(async () => {
      userEvent.type(emailInput, "testuser@gmail.com");
      userEvent.type(passwordInput, "password123");
      userEvent.type(confirmPasswordInput, "password123");
    });

    expect(submitButton).toBeEnabled();
  });
});
