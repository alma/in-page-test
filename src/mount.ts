import { elementNotFound, getCheckoutUrl, getElement } from "./helpers";
import { Store } from "./store";
import { ENV } from "./types";

export const makeMount =
  (paymentId: string, env: ENV, store: Store) => (selector: string) => {
    if (!selector) {
      elementNotFound();
    }
    if (store.getEmbeddedSelector()) {
      throw new Error("Deja mount");
    }

    store.setEmbeddedSelector(selector);

    const url = getCheckoutUrl(env, paymentId, "/in-page/embedded/");

    injectIframe(selector, url);
  };

function injectIframe(selector: string, url: string) {
  const element = getElement(selector);
  if (element && element?.childNodes.length > 0) {
    throw Error(
      `Failed to inject iframe: element ${selector} already has a child node. Please leave it empty.`
    );
  }
  const iframe = document.createElement("iframe");
  iframe.src = url;

  // TODO Pass options to the iframe via the API
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  element?.appendChild(iframe);
}
