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

    if (options.onSuccess) {
      options.onSuccess();
    } else {
      console.log("Redirection to redirection_url");
    }

    // <!--  Adding the allow property to the iframe gives permission to providers to request camera access  -->
    // <iframe id="fragments-modal-iframe" class="checkout-iframe" allow="camera *;"></iframe>
    // Merci Timur
  };
