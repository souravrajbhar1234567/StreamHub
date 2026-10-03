import test from "node:test";
import assert from "node:assert/strict";
import { moderateText } from "../../backend/src/services/moderationService.js";

test("moderateText should sanitize profanity and spam keywords", () => {
  const input = "This is a great video, not spam!";
  const result = moderateText(input);
  assert.equal(result.cleanText, "This is a great video, not ****!");
});

test("moderateText should pass clean text unchanged", () => {
  const input = "Awesome tutorial on React 19!";
  const result = moderateText(input);
  assert.equal(result.cleanText, input);
});
