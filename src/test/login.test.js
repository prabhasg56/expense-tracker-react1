import { render, screen } from "@testing-library/react";
import ForgotModal from "../components/ForgotModal";

describe("Forgot page testing..", () => {
  render(<ForgotModal />);
  test("Forgot title ", () => {
    const forgotTitle = screen.findByText("Forgot password");

    expect(forgotTitle).toBeTruthy();
  });

  test("Forgot label ", () => {
    const forgotLabel = screen.findByText(
      "Enter the email with which you have registered!"
    );
    expect(forgotLabel).toBeTruthy();
  });
});
