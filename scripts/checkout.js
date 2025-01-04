import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

export function renderPage() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

Promise.all([
  new Promise((resolve) => {
    loadProducts(resolve);
  }),
  new Promise((resolve) => {
    loadCart(resolve);
  })
]).then(() => {
  renderPage();
});