import { hashPaymentId } from "./helpers";
import { sendMessage } from "./messages/send";
import { Store } from "./store";
import { ENV } from "./types";

export const makeStartPayment =
  (paymentId: string, env: ENV, store: Store) => async () => {
    const hash = await hashPaymentId(paymentId);
    return sendMessage(store, { type: "user_wants_to_pay", hash }, env);
  };
