import { expect, test } from "vitest";
import { computeWeekStart, computeNewWeekStart, createDate } from "./date";

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

/****
 * computeNewWeekStart: next week is this month:
 *   *******/
test("computeNewWeekStart: next week is this month: 1", () => {
  expect(computeNewWeekStart("2023-12-10", "forward")).toBe("2023-12-17");
});
test("computeNewWeekStart: next week is this month: 2", () => {
  expect(computeNewWeekStart("2024-02-04", "forward")).toBe("2024-02-11");
});
test("computeNewWeekStart: next week is this month: 3", () => {
  expect(computeNewWeekStart("2024-03-24", "forward")).toBe("2024-03-31");
});

/****
 *  computeNewWeekStart: next week is next month:
 *   *******/
test("computeNewWeekStart: next week is next month: 1", () => {
  expect(computeNewWeekStart("2023-11-26", "forward")).toBe("2023-12-03");
});

test("computeNewWeekStart: next week is next month: 2", () => {
  expect(computeNewWeekStart("2024-01-28", "forward")).toBe("2024-02-04");
});

/****
 *  computeNewWeekStart: next week is next year:
 *   *******/
test("computeNewWeekStart: next week is next year: 1", () => {
  expect(computeNewWeekStart("2023-12-31", "forward")).toBe("2024-01-07");
});

test("computeNewWeekStart: next week is next year: 2", () => {
  expect(computeNewWeekStart("2024-12-29", "forward")).toBe("2025-01-05");
});

// computeNewWeekStart "backward"
/****
 *  computeNewWeekStart: last week is this month:
 *   *******/
test("computeNewWeekStart: last week is this month: 1", () => {
  expect(computeNewWeekStart("2023-12-10", "backward")).toBe("2023-12-03");
});

test("computeNewWeekStart: last week is this month: 2", () => {
  expect(computeNewWeekStart("2023-12-31", "backward")).toBe("2023-12-24");
});

test("computeNewWeekStart: last week is this month: 3", () => {
  expect(computeNewWeekStart("2023-10-22", "backward")).toBe("2023-10-15");
});

/****
 *  computeNewWeekStart: last week is last month:
 *   *******/
test("computeNewWeekStart: last week is last month", () => {
  expect(computeNewWeekStart("2023-12-03", "backward")).toBe("2023-11-26");
});

/****
 *  computeNewWeekStart: last week is last year:
 *   *******/
test("computeNewWeekStart: last week is last year", () => {
  expect(computeNewWeekStart("2024-01-07", "backward")).toBe("2023-12-31");
});

/****
 *  createDate: month is 1 digit:
 *   *******/
test("createDate: month is 1 digit", () => {
  expect(createDate("2023-11-26")).toStrictEqual(
    new Date(2023, 10, 26, 0, 0, 0)
  );
});
