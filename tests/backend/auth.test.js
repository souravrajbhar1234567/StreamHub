import test from "node:test";
import assert from "node:assert/strict";
import { generateToken, verifyToken } from "../../backend/src/utils/generateToken.js";
import { generateOTP } from "../../backend/src/utils/generateOTP.js";

test("generateOTP should produce a 6-digit numeric string", () => {
  const otp = generateOTP(6);
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);
});

test("generateToken and verifyToken should sign and decode JWT correctly", () => {
  const fakeUserId = "507f1f77bcf86cd799439011";
  const token = generateToken(fakeUserId, "user");
  assert.ok(typeof token === "string");

  const decoded = verifyToken(token);
  assert.equal(decoded.id, fakeUserId);
  assert.equal(decoded.role, "user");
});
