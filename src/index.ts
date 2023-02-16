import { ENV, InitializeOptions } from "./types";
import { createStore } from "./store";

import { makeMount } from "./mount";
import { makePay } from "./pay";
import { makeUnmount } from "./unmount";
import { hideModal, showModal } from "./Modal/modal";
import { startListener } from "./messages/listener";

export namespace InPage {
  /**
   * Initialize the InPage component
   *
   * @param paymentId
   * @param options: InitializeOptions
   */
  export function initialize(
    paymentId: string,
    options: InitializeOptions = {}
  ) {
    const store = createStore();
    const { onInPageStatusChanged } = startListener(
      paymentId,
      options.environment
    );

    onInPageStatusChanged("embedded-loaded", () => {
      store.setIsCheckoutLoaded(true);
      console.log("Observer tells Checkout is loaded");
    });

    onInPageStatusChanged("can-open-modal", () => {
      showModal(paymentId, options.environment);
    });

    onInPageStatusChanged("payment_success", () => {
      hideModal(false);

      if (options.onPaymentSucceeded) {
        options.onPaymentSucceeded();
      } else {
        // TODO: will require to fetch data, maybe from a GET payment?
        console.log("Redirection to redirection_url");
      }
    });

    return {
      mount: makeMount(paymentId, options, store),
      startPayment: makePay(paymentId, options, store),
      unmount: makeUnmount(paymentId, options, store),
    };
  }
}
