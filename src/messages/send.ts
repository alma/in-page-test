import { getCheckoutUrlBasedOnEnv, getElement } from "../helpers";
import { ENV, Message } from "../types";

export function sendMessage(
  message: Message,
  env: ENV,
  selector: string | null
) {
  if (!selector) {
    console.error("Can not send message yet, mount() has not been called.");
    return false;
  }

  const element = getElement(selector);
  const iframe = element?.firstChild as HTMLIFrameElement; // We get the iframe inside

  iframe.contentWindow?.postMessage(message, getCheckoutUrlBasedOnEnv(env));
  return true;
}
