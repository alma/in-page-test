import { showModal } from "./modal";
import { Store } from "./store";
import { InitializeOptions } from "./types";

/**
 * TODO
 */
export const makePay =
  (paymentId: string, options: InitializeOptions, store: Store) => () => {
    console.log(
      `Pay() on payment ${paymentId}, current selector is: ${store.getEmbeddedSelector()}`
    );

    showModal();

    // TODO Move this inside an event listener that states that the payment is done
    if (options.onSuccess) {
      options.onSuccess();
    } else {
      console.log("Redirection to redirection_url");
    }
  };
