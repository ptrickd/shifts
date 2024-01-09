import { expect, test } from "vitest";
import { computeWeekStart, computeNewWeekStart } from "./date";

test("computeWeekStart: week start today", () => {
  const today = new Date();
  today.setFullYear(2023);
  today.setMonth(11);
  today.setDate(10);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("computeWeekStart: week start this month", () => {
  const today = new Date();
  today.setFullYear(2023);
  today.setMonth(11);
  today.setDate(14);

  expect(computeWeekStart(today)).toBe("2023-12-10");
});

test("computeWeekStart: week start the previous month", () => {
  const today = new Date();
  today.setFullYear(2023);
  today.setMonth(11);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-11-26");
});

test("computeWeekStart: week start the previous year", () => {
  const today = new Date();
  today.setFullYear(2024);
  today.setMonth(0);
  today.setDate(2);

  expect(computeWeekStart(today)).toBe("2023-12-31");
});

// computeNewWeekStart "forward"

// 2023-11-26
// 2023-12-03
// 2023-12-10
// 2023-12-17
// 2023-12-24
// 2023-12-31
// 2024-01-07
// 2024-01-14
// 2024-01-21
// 2024-01-28
// 2024-02-04

test("computeNewWeekStart: next week is this month", () => {
  expect(computeNewWeekStart("2023-12-10", "forward")).toBe("2023-12-17");
});

test("computeNewWeekStart: next week is next month", () => {
  expect(computeNewWeekStart("2023-11-26", "forward")).toBe("2023-12-03");
});

test("computeNewWeekStart: next week is next year", () => {
  expect(computeNewWeekStart("2023-12-31", "forward")).toBe("2024-01-06");
});
test("computeNewWeekStart: next week is next ,month", () => {
  expect(computeNewWeekStart("2024-01-28", "forward")).toBe("2024-02-04");
});
// computeNewWeekStart "backward"
test("computeNewWeekStart: last week is this month", () => {
  expect(computeNewWeekStart("2023-12-10", "backward")).toBe("2023-12-03");
});

test("computeNewWeekStart: last week is this month", () => {
  expect(computeNewWeekStart("2023-12-31", "backward")).toBe("2023-12-24");
});

test("computeNewWeekStart: last week is last month", () => {
  expect(computeNewWeekStart("2023-12-03", "backward")).toBe("2023-11-26");
});

test("computeNewWeekStart: last week is last year", () => {
  expect(computeNewWeekStart("2024-01-07", "backward")).toBe("2023-12-31");
});
