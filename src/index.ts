import { ENV, InitializeOptions } from "./types";
import { createStore } from "./store";

import { makeMount } from "./mount";
import { makePay } from "./pay";
import { makeUnmount } from "./unmount";

export namespace InPage {
  /**
   * Initialize the InPage component
   *
   * @param paymentId
   * @param env `test` (sandbox env) or `live`
   */
  export function initialize(
    paymentId: string,
    env: ENV,
    options: InitializeOptions = {}
  ) {
    const store = createStore();

    window.addEventListener(
      "message",
      (event) => {
        // if (event.origin === "https://localhost:3000") {
        console.log(`InPage: message from ${event.origin}`, event.data);

        const payload = event.data.payload;

        switch (event.data.type) {
          case "payment_status":
            if (payload === "payment_in_progress") {
            }
            break;

          case "installment_selected":
            console.log("installments", payload.installments_count);
            break;

          default:
            console.warn("Weird message type", event.data.type);
        }
      },
      false
    );

    return {
      mount: makeMount(paymentId, options, store),
      pay: makePay(paymentId, options, store),
      unmount: makeUnmount(paymentId, options, store),
    };
  }
}
