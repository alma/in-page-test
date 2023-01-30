/**
 * Get the element from the DOM, if none is found, throw an error.
 *
 * @param selector string of the current element
 * @returns HTMLElement | null
 */
export const getElement = (selector: string) => {
  const element = document.getElementById(selector.replace("#", ""));
  if (element) {
    return element;
  } else {
    elementNotFound();
  }
};

/**
 * Throws an error if the element is not found.
 */
export function elementNotFound() {
  throw Error("Element not found, please add an id selector for the iframe");
}
