import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import DisplayTimeCells from "../components/DisplayTimeCells";

test("render DisplayTimeCells properly when all shifts Off", () => {
  render(
    <DisplayTimeCells
      employee={{ id: 57, displayName: "Athena" }}
      shifts={[]}
      weekStart={"2024-01-07"}
    />
  );
  expect(screen.getAllByText("OFF").length).toBe(7);
});

test("render DisplayTimeCells properly when 1 shift is On and display ", () => {
  render(
    <DisplayTimeCells
      employee={{ id: 60, displayName: "Damian" }}
      shifts={[
        {
          id: 176,
          employeeId: 60,
          date: "2024-01-10",
          startTime: "08:00",
          endTime: "12:00",
          weekStart: "2024-01-07",
        },
      ]}
      weekStart={"2024-01-07"}
    />
  );
  expect(screen.getAllByText("OFF").length).toBe(6);
  expect(screen.getByTestId("start-time").textContent).toBe("Start : 08:00");
  expect(screen.getByTestId("end-time").textContent).toBe("End : 12:00");
});

test("render DisplayTimeCells properly when 2 shifts are On and display ", () => {
  render(
    <DisplayTimeCells
      employee={{ id: 60, displayName: "Damian" }}
      shifts={[
        {
          id: 176,
          employeeId: 60,
          date: "2024-01-09",
          startTime: "08:00",
          endTime: "12:00",
          weekStart: "2024-01-07",
        },
        {
          id: 176,
          employeeId: 60,
          date: "2024-01-10",
          startTime: "08:00",
          endTime: "12:00",
          weekStart: "2024-01-07",
        },
      ]}
      weekStart={"2024-01-07"}
    />
  );
  expect(screen.getAllByText("OFF").length).toBe(5);
  expect(screen.getAllByTestId("start-time").length).toBe(2);
  expect(screen.getAllByTestId("end-time").length).toBe(2);
});
