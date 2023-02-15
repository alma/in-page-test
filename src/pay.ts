import { hashPaymentId } from "./helpers";
import { sendMessage } from "./messages/send";
import { Store } from "./store";
import { InitializeOptions } from "./types";

export const makePay =
  (paymentId: string, options: InitializeOptions, store: Store) => async () => {
    const hash = await hashPaymentId(paymentId);
    return sendMessage(
      store,
      { type: "user_wants_to_pay", hash },
      options.environment
    );
  };
