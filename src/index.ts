import { createStore } from "./store";
import { InitializeOptions } from "./types";

import { startListener } from "./messages/listener";
import { removeModal, removeModalCloseElement, showModal } from "./Modal/modal";
import { mount } from "./mount";
import { startPayment } from "./startPayment";
import { unmount } from "./unmount";

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
    const store = createStore(paymentId, options.environment);

    const { onInPageStatusChanged, unsubscribe } = startListener(
      store.getPaymentId(),
      store.getEnvironment()
    );

    onInPageStatusChanged("embedded_loaded", () => {
      store.setIsCheckoutLoaded(true);
    });

    onInPageStatusChanged("can_open_modal", () => {
      showModal(store.getPaymentId(), store.getEnvironment());
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
      mount: (selector: string) => mount(store, selector),
      startPayment: () => startPayment(store),
      unmount: () => unmount(store, unsubscribe),
    };
  }
}
