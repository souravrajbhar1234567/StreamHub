import test from "node:test";
import assert from "node:assert/strict";
import { encrypt, decrypt, hashString } from "../../backend/src/utils/encryption.js";
import { parseDevice } from "../../backend/src/utils/deviceParser.js";
import { parseBrowser } from "../../backend/src/utils/browserParser.js";

test("encryption and decryption round-trip correctly", () => {
  const secret = "StreamHubSecretData123";
  const encrypted = encrypt(secret);
  assert.notEqual(encrypted, secret);
  const decrypted = decrypt(encrypted);
  assert.equal(decrypted, secret);
});

test("hashString produces sha256 output", () => {
  const hash = hashString("hello");
  assert.equal(hash.length, 64);
});

test("device and browser parsing extract user agent info", () => {
  const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  const device = parseDevice(ua);
  const browser = parseBrowser(ua);
  assert.ok(device);
  assert.equal(browser.name, "Chrome");
});
