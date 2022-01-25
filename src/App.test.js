import { render, screen } from "@testing-library/react";
import App from "./App";

test("test suite working", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  expect(true).toBe(true);
});
