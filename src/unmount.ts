import { getElement } from "./helpers";
import { Store } from "./store";
import { InitializeOptions } from "./types";

/**
 * Unmounts the iframe (for the Embedded component) from the dom
 *
 * @param parentOptions the options passed to the initialize function
 */
export const makeUnmount = (options: InitializeOptions, store: Store) => () => {
  const selector = store.getEmbeddedSelector();

  // This condition is to avoid calling the onClose event if the element is already destroyed
  if (!selector) {
    return;
  }

  if (!options.onModalClosed) {
    console.log("onModalClosed is not specified");
  } else {
    options.onModalClosed();
  }

  const element = getElement(selector);
  store.setEmbeddedSelector(null);
  if (!element?.childNodes[0]) return;
  element?.removeChild(element.childNodes[0]);
};
