import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// import { StateForm as Form } from "./StateForm";
import { RefForm as Form } from "./RefForm";
import userEvent from "@testing-library/user-event";

describe("StateForm component", () => {
  it("should render the form", () => {
    render(<Form />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  // - Ensure error messages do not show up when submitting a valid form, and that the `onSubmit` function is called with the correct email/password.
  it("should call onSubmit when the form is valid", async () => {
    const onSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Submit");

    const email = "test@webdevsimplified.com";
    const password = "Password@123";
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.click(submitBtn);

    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument();

    expect(onSubmitMock).toHaveBeenCalledOnce();
    expect(onSubmitMock).toHaveBeenCalledWith({ email, password });
  });

  // - Ensure error messages show up when submitting an invalid form, and that the `onSubmit` function is not called.
  // - Ensure the error messages update when the user changes the input values after the first submit.

  it("should show email error messages when email is invalid", async () => {
    const onSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Submit");

    let email = "email@example.com";
    const password = "Password123";
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.click(submitBtn);

    expect(screen.getByTestId("email-error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument();
    expect(onSubmitMock).not.toHaveBeenCalledOnce();

    email = "test@webdevsimplified.com";
    await user.clear(emailInput);
    await user.type(emailInput, email);
    await user.click(submitBtn);

    expect(onSubmitMock).toHaveBeenCalledOnce();
    expect(onSubmitMock).toHaveBeenCalledWith({ email, password });
  });

  it("should show password error messages when password is invalid", async () => {
    const onSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmitMock} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Submit");

    const email = "test@webdevsimplified.com";
    let password = "abc123";
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.click(submitBtn);

    expect(screen.getByTestId("password-error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument();
    expect(onSubmitMock).not.toHaveBeenCalledOnce();

    password = "Password123";
    await user.clear(passwordInput);
    await user.type(passwordInput, password);
    await user.click(submitBtn);

    expect(onSubmitMock).toHaveBeenCalledOnce();
    expect(onSubmitMock).toHaveBeenCalledWith({ email, password });
  });
});
