//github.com/vitest-dev/vitest/blob/main/examples/react-mui/test/testUtils.tsx import "@testing-library/jest-dom/vitest";
// import matchers from "@testing-library/jest-dom/matchers";
import { render, screen } from "@testing-library/react";
import { test } from "vitest";

// import userEvent from "@testing-library/user-event";

//Conponents
import DisplayTopRow from "./DisplayTopRow";

// expect.extend(matchers);

const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
test("render DisplayTopRow", () => {
  render(
    <DisplayTopRow
      weekDays={TOP_ROW}
      today={new Date(Date.now())}
      weekStart={new Date("2023-12-24")}
    />
  );

  expect(screen.getByText("Names")).toBeInTheDocument();
});
