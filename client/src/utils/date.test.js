import { expect, test } from "vitest";
import { computeWeekStart } from "./date";

test("week start today", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(10);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("week start this month", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(14);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("week start the previous month", () => {
  const today = new Date();
  today.setYear(2023);
  today.setMonth(11);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-11-26");
});

test("week start the previous year", () => {
  const today = new Date();
  today.setYear(2024);
  today.setMonth(0);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-12-31");
});
