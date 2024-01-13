import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import TotalHoursByEmployee from "./TotalHoursByEmployee";

test("render TotalHoursByEmployee properly", async () => {
  render(<TotalHoursByEmployee total={5} />);

  expect(screen.getByText(5)).toBeInTheDocument();
});
