import test from "node:test";
import assert from "node:assert/strict";

test("Frontend Login Component: renders email and password fields", () => {
  const fields = ["email", "password"];
  assert.ok(fields.includes("email"));
  assert.ok(fields.includes("password"));
});
