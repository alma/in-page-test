type Selector = string | null;

export type Store = {
  setEmbeddedSelector: (selector: Selector) => void;
  getEmbeddedSelector: () => Selector;
  getIsCheckoutLoaded: () => boolean;
  setIsCheckoutLoaded: (status: boolean) => void;
};

export const createStore: () => Store = () => {
  let embeddedSelector: Selector = null;
  let isCheckoutLoaded: boolean = false;

  const setEmbeddedSelector = (selector: Selector) => {
    embeddedSelector = selector;
  };

  const getEmbeddedSelector = () => {
    return embeddedSelector;
  };

  const setIsCheckoutLoaded = (status: boolean) => {
    isCheckoutLoaded = status;
  };

  const getIsCheckoutLoaded = () => {
    return isCheckoutLoaded;
  };

  return {
    setEmbeddedSelector,
    getEmbeddedSelector,
    setIsCheckoutLoaded,
    getIsCheckoutLoaded,
  };
};
