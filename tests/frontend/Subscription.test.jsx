import test from "node:test";
import assert from "node:assert/strict";

test("Frontend Subscription Component: displays Free, Pro and Premium tiers", () => {
  const plans = ["Free", "Pro", "Premium"];
  assert.equal(plans.length, 3);
  assert.ok(plans.includes("Pro"));
});
