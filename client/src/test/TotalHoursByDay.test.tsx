import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

//Conponents
import TotalHoursByDay from "../components/TotalHoursByDay";

test("render DisplayTopRow properly when all values are )", async () => {
  render(
    <TotalHoursByDay
      computedValues={[
        { total: 0 },
        { total: 1 },
        { total: 2 },
        { total: 3 },
        { total: 4 },
        { total: 5 },
        { total: 6 },
      ]}
    />
  );
  await screen.findByText(0);
  expect(screen.getByText("Total")).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();
  expect(screen.getByText(1)).toBeInTheDocument();
  expect(screen.getByText(2)).toBeInTheDocument();
  expect(screen.getByText(3)).toBeInTheDocument();
  expect(screen.getByText(4)).toBeInTheDocument();
  expect(screen.getByText(5)).toBeInTheDocument();
  expect(screen.getByText(6)).toBeInTheDocument();
});
