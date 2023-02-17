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
    // InPage state:
    let isCheckoutLoaded = false;
    let elementId: string | null = null;

    const env = options.environment || "LIVE";

    const { onInPageStatusChanged, unsubscribe } = startListener(
      paymentId,
      env
    );

    onInPageStatusChanged("embedded_loaded", () => {
      isCheckoutLoaded = true;
    });

    onInPageStatusChanged("can_open_modal", () => {
      showModal(paymentId, env);
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
      mount: (selector: string) => {
        mount(paymentId, env, selector);
        elementId = selector;
      },
      startPayment: () => {
        if (isCheckoutLoaded) {
          startPayment(env, paymentId, elementId);
        } else {
          console.log("Pas loaded :(");
        }
      },
      unmount: () => unmount(elementId, unsubscribe),
    };
  }
}
