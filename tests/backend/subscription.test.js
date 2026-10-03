import test from "node:test";
import assert from "node:assert/strict";
import { addDays, addMonths, isExpired } from "../../backend/src/utils/dateUtils.js";

test("addMonths adds one calendar month", () => {
  const base = new Date("2026-01-15T00:00:00Z");
  const nextMonth = addMonths(base, 1);
  assert.equal(nextMonth.getUTCMonth(), 1); // February
});

test("isExpired detects past dates accurately", () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  assert.equal(isExpired(yesterday), true);
  assert.equal(isExpired(tomorrow), false);
});
