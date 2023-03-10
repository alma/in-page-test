import { createStore } from "./store";
import { InitializeOptions } from "./types";

import { fetchReturnUrl } from "./helpers";
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
    let returnUrl: string | null = null;

    fetchReturnUrl(store.getPaymentId(), store.getEnvironment()).then((url) => {
      returnUrl = url;
    });

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
      } else if (returnUrl) {
        window.location.assign(returnUrl);
      }
    });

    return {
      mount: (selector: string) => mount(store, selector),
      startPayment: () => startPayment(store),
      unmount: () => unmount(store, unsubscribe),
    };
  }
}
