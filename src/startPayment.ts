import { hashPaymentId } from "./helpers";
import { sendMessage } from "./messages/send";
import { ENV } from "./types";

export async function startPayment(
  env: ENV,
  paymentId: string,
  selector: string | null
) {
  const hash = await hashPaymentId(paymentId);
  return sendMessage({ type: "user_wants_to_pay", hash }, env, selector);
}
