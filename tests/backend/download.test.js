import test from "node:test";
import assert from "node:assert/strict";
import { getQuotaForPlan, canDownload } from "../../backend/src/utils/quotaUtils.js";

test("getQuotaForPlan returns correct download limits", () => {
  assert.equal(getQuotaForPlan("Free").downloadLimit, 0);
  assert.equal(getQuotaForPlan("Pro").downloadLimit, 25);
  assert.equal(getQuotaForPlan("Premium").downloadLimit, 100);
});

test("canDownload correctly enforces tier threshold", () => {
  assert.equal(canDownload("Free", 0), false);
  assert.equal(canDownload("Pro", 20), true);
  assert.equal(canDownload("Pro", 25), false);
  assert.equal(canDownload("Premium", 50), true);
});
