import { getCheckoutUrlBasedOnEnv, hashPaymentId } from "../helpers";
import { ENV } from "../types";

type Subscriber = {
  eventName: string;
  callback: () => void;
};

export function startListener(paymentId: string, env?: ENV) {
  const inPageStatusSubscribers: Subscriber[] = [];

  const listener = async (event: MessageEvent<any>) => {
    // Listen only to Checkout:
    const hashedPaymentID = await hashPaymentId(paymentId);
    if (
      event.origin !== getCheckoutUrlBasedOnEnv(env) &&
      event.data.hash !== hashedPaymentID
    ) {
      return false;
    }

    console.log(`InPage: message from ${event.origin}`, event.data);

    const payload = event.data.payload;

    switch (event.data.type) {
      case "in_page_status":
        inPageStatusSubscribers
          .filter(({ eventName }) => eventName === payload)
          .forEach(({ callback }) => {
            callback();
          });
        break;

      default:
        console.warn("Weird message type", event.data.type);
    }
  };

  window.addEventListener("message", listener, false);

  function unsubscribe() {
    window.removeEventListener("message", listener, false);
  }

  function onInPageStatusChanged(eventName: string, callback: () => void) {
    inPageStatusSubscribers.push({ eventName, callback });
  }

  return {
    onInPageStatusChanged,
    unsubscribe,
  };
}
