import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

export function renderPage() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

async function loadPage() {
  try {
    await loadProductsFetch();
    const value = await new Promise((resolve) => {
      loadCart(resolve);
    });
  } catch (error) {
    console.error('Unexpected error. Please try again later.');
  }
  await loadProductsFetch();

  const value = await new Promise((resolve) => {
    loadCart(resolve);
  });
  renderPage();
}
loadPage();