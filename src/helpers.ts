import { ENV } from "./types";

/**
 * Get the element from the DOM, if none is found, throw an error.
 *
 * @param selector string of the current element
 * @returns HTMLElement | null
 */
export const getElement = (selector: string) => {
  const element = document.getElementById(selector.replace("#", ""));
  if (element) {
    return element;
  } else {
    elementNotFound();
  }
};

/**
 * Throws an error if the element is not found.
 */
export function elementNotFound() {
  throw Error("Element not found, please add an id selector for the iframe");
}

export function getCheckoutUrlBasedOnEnv(env?: ENV) {
  switch (env) {
    case "LOCAL":
      return "https://localhost:3000";
    case "TEST":
    case "SANDBOX":
      return "https://checkout.sandbox.almapay.com";
    case "STAGING":
    case "DEV":
      return "https://checkout.staging.almapay.com";
    case "LIVE":
    case "PROD":
    default:
      return "https://checkout.almapay.com";
  }
}

/**
 * This is used to send a hash instead of a paymentId through `postMessage for InPage`
 * * /!\ If you update this method, do not forget to update the one in the checkout project
 */
export function hashPaymentId(paymentId: string) {
  return window.crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(paymentId))
    .then((hash) => {
      const hex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hex;
    });
}
