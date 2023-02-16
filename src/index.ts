import { InitializeOptions } from "./types";
import { createStore } from "./store";

import { makeMount } from "./mount";
import { makeStartPayment } from "./startPayment";
import { makeUnmount } from "./unmount";
import { removeModal, removeModalCloseElement, showModal } from "./Modal/modal";
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
    const optionsWithDefaultEnv = {
      ...options,
      environment: options.environment ?? "LIVE",
    };

    const store = createStore();
    const { onInPageStatusChanged } = startListener(
      paymentId,
      optionsWithDefaultEnv.environment
    );

    onInPageStatusChanged("embedded_loaded", () => {
      store.setIsCheckoutLoaded(true);
      console.log("Observer tells Checkout is loaded");
    });

    onInPageStatusChanged("can_open_modal", () => {
      showModal(paymentId, optionsWithDefaultEnv.environment);
    });

    onInPageStatusChanged("payment_succeeded", () => {
      removeModalCloseElement();
    });

    onInPageStatusChanged("trigger_success_callback", () => {
      removeModal(false);

      if (options.onPaymentSucceeded) {
        options.onPaymentSucceeded();
      } else {
        // TODO: will require to fetch data, maybe from a GET payment?
        console.log("Redirection to redirection_url");
      }
    });

    return {
      mount: makeMount(paymentId, optionsWithDefaultEnv.environment, store),
      startPayment: makeStartPayment(
        paymentId,
        optionsWithDefaultEnv.environment,
        store
      ),
      unmount: makeUnmount(optionsWithDefaultEnv, store),
    };
  }
}
