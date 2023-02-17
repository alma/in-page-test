import { getElement } from "./helpers";
import { removeModal } from "./Modal/modal";

/**
 * Unmounts the iframe (for the Embedded component) from the dom
 *
 * @param parentOptions the options passed to the initialize function
 */
export function unmount(elementId: string | null, unsubscribe: () => void) {
  removeModal(false);
  unsubscribe();

  // This condition is to avoid cleaning the DOM, if it is already removed
  if (!elementId) {
    return;
  }
  const embeddedParent = getElement(elementId);
  embeddedParent?.removeChild(embeddedParent.childNodes[0]);
}
