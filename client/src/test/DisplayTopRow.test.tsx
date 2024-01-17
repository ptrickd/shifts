//github.com/vitest-dev/vitest/blob/main/examples/react-mui/test/testUtils.tsx import "@testing-library/jest-dom/vitest";
// import matchers from "@testing-library/jest-dom/matchers";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { createDate } from "../utils/date";
// import userEvent from "@testing-library/user-event";

//Conponents
import DisplayTopRow from "../components/DisplayTopRow";

// expect.extend(matchers);

const TOP_ROW = ["Names", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
test("render DisplayTopRow properly when all is in the same month", () => {
  render(
    <DisplayTopRow weekDays={TOP_ROW} weekStart={createDate("2023-12-24")} />
  );

  expect(screen.getByText("Names")).toBeInTheDocument();
  expect(screen.getByText("Sun")).toBeInTheDocument();
  expect(screen.getByText("Mon")).toBeInTheDocument();
  expect(screen.getByText("Tue")).toBeInTheDocument();
  expect(screen.getByText("Wed")).toBeInTheDocument();
  expect(screen.getByText("Thu")).toBeInTheDocument();
  expect(screen.getByText("Fri")).toBeInTheDocument();
  expect(screen.getByText("Sat")).toBeInTheDocument();

  expect(screen.getByText(24)).toBeInTheDocument();
  expect(screen.getByText(25)).toBeInTheDocument();
  expect(screen.getByText(26)).toBeInTheDocument();
  expect(screen.getByText(27)).toBeInTheDocument();
  expect(screen.getByText(28)).toBeInTheDocument();
  expect(screen.getByText(29)).toBeInTheDocument();
  expect(screen.getByText(30)).toBeInTheDocument();
});

test("render DisplayTopRow properly when the week is separate in 2 months: 31 days month: 1", () => {
  render(
    <DisplayTopRow weekDays={TOP_ROW} weekStart={createDate("2023-12-31")} />
  );

  expect(screen.getByText("Names")).toBeInTheDocument();
  expect(screen.getByText("Sun")).toBeInTheDocument();
  expect(screen.getByText("Mon")).toBeInTheDocument();
  expect(screen.getByText("Tue")).toBeInTheDocument();
  expect(screen.getByText("Wed")).toBeInTheDocument();
  expect(screen.getByText("Thu")).toBeInTheDocument();
  expect(screen.getByText("Fri")).toBeInTheDocument();
  expect(screen.getByText("Sat")).toBeInTheDocument();

  expect(screen.getByText(31)).toBeInTheDocument();
  expect(screen.getByText(1)).toBeInTheDocument();
  expect(screen.getByText(2)).toBeInTheDocument();
  expect(screen.getByText(3)).toBeInTheDocument();
  expect(screen.getByText(4)).toBeInTheDocument();
  expect(screen.getByText(5)).toBeInTheDocument();
  expect(screen.getByText(6)).toBeInTheDocument();
});

test("render DisplayTopRow properly when the week is separate in 2 months: 30 days month", () => {
  render(
    <DisplayTopRow weekDays={TOP_ROW} weekStart={createDate("2023-11-26")} />
  );

  expect(screen.getByText("Names")).toBeInTheDocument();
  expect(screen.getByText("Sun")).toBeInTheDocument();
  expect(screen.getByText("Mon")).toBeInTheDocument();
  expect(screen.getByText("Tue")).toBeInTheDocument();
  expect(screen.getByText("Wed")).toBeInTheDocument();
  expect(screen.getByText("Thu")).toBeInTheDocument();
  expect(screen.getByText("Fri")).toBeInTheDocument();
  expect(screen.getByText("Sat")).toBeInTheDocument();

  expect(screen.getByText(26)).toBeInTheDocument();
  expect(screen.getByText(27)).toBeInTheDocument();
  expect(screen.getByText(28)).toBeInTheDocument();
  expect(screen.getByText(29)).toBeInTheDocument();
  expect(screen.getByText(30)).toBeInTheDocument();
  expect(screen.getByText(1)).toBeInTheDocument();
  expect(screen.getByText(2)).toBeInTheDocument();
});

test("render DisplayTopRow properly when the week is separate in 2 months: 31 days month: 2", () => {
  render(
    <DisplayTopRow weekDays={TOP_ROW} weekStart={createDate("2024-01-28")} />
  );

  expect(screen.getByText("Names")).toBeInTheDocument();
  expect(screen.getByText("Sun")).toBeInTheDocument();
  expect(screen.getByText("Mon")).toBeInTheDocument();
  expect(screen.getByText("Tue")).toBeInTheDocument();
  expect(screen.getByText("Wed")).toBeInTheDocument();
  expect(screen.getByText("Thu")).toBeInTheDocument();
  expect(screen.getByText("Fri")).toBeInTheDocument();
  expect(screen.getByText("Sat")).toBeInTheDocument();

  expect(screen.getByText(28)).toBeInTheDocument();
  expect(screen.getByText(29)).toBeInTheDocument();
  expect(screen.getByText(30)).toBeInTheDocument();
  expect(screen.getByText(31)).toBeInTheDocument();
  expect(screen.getByText(1)).toBeInTheDocument();
  expect(screen.getByText(2)).toBeInTheDocument();
  expect(screen.getByText(3)).toBeInTheDocument();
});
