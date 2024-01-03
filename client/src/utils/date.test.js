import { expect, test } from "vitest";
import { computeWeekStart, computeNewWeekStart } from "./date";

test("computeWeekStart: week start today", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(10);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("computeWeekStart: week start this month", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(14);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("computeWeekStart: week start the previous month", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-11-26");
});

test("computeWeekStart: week start the previous year", () => {
  const today = new Date();
  today.setYear(2024);
  today.setMonth(0);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-12-31");
});

test("computeNewWeekStart: next week is this month", () => {
  expect(computeNewWeekStart("2023-12-10", "forward")).toBe("2023-12-17");
});

test("computeNewWeekStart: next week is next month", () => {
  expect(computeNewWeekStart("2023-11-26", "forward")).toBe("2023-12-02");
});

// test("computeNewWeekStart: last week is this month", () => {
//   expect(computeNewWeekStart("2023-12-10", "backward")).toBe("2023-12-03");
// });
