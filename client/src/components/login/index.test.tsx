import * as React from "react";
import { act, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from ".";

describe("Login", () => {
  test("Submitting the login form calls the login api", () => {
    render(<Login />);
    const signUpForm = screen.getByRole("form", { name: /login/i });
    expect(signUpForm).toBeInTheDocument();
  });

  test("The submit button is disabled by default", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("The submit button is enabled when all fields are correctly filled", async () => {
    render(<Login />);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByRole("textbox", { name: "password" });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await act(async () => {
      userEvent.type(emailInput, "testuser@gmail.com");
      userEvent.type(passwordInput, "password123");
    });
    expect(submitButton).toBeEnabled();
  });
});
