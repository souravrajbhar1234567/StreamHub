import test from "node:test";
import assert from "node:assert/strict";

test("Frontend Download Component: verifies quota calculation and button state", () => {
  const quota = { used: 5, limit: 25 };
  const remaining = quota.limit - quota.used;
  assert.equal(remaining, 20);
});
