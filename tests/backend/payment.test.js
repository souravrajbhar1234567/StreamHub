import test from "node:test";
import assert from "node:assert/strict";
import { generateInvoiceNumber, formatInvoiceData } from "../../backend/src/utils/generateInvoice.js";

test("generateInvoiceNumber should return a formatted invoice string", () => {
  const inv = generateInvoiceNumber();
  assert.match(inv, /^SH-INV-\d{8}-[A-F0-9]{6}$/);
});

test("formatInvoiceData formats payment and customer details", () => {
  const payment = {
    amount: 299,
    currency: "INR",
    razorpayPaymentId: "pay_12345",
  };
  const user = {
    _id: "u123",
    name: "John Doe",
    email: "john@example.com",
  };
  const plan = {
    name: "Pro",
  };

  const invoice = formatInvoiceData({ payment, user, plan });
  assert.equal(invoice.customer.name, "John Doe");
  assert.equal(invoice.plan.name, "Pro");
  assert.equal(invoice.total, 299);
  assert.equal(invoice.payment.method, "Razorpay");
});
