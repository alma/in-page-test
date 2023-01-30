type Selector = string | null;

export type Store = {
  setEmbeddedSelector: (selector: Selector) => void;
  getEmbeddedSelector: () => Selector;
};

export const createStore: () => Store = () => {
  let embeddedSelector: Selector = null;

  const setEmbeddedSelector = (selector: Selector) => {
    embeddedSelector = selector;
  };

  const getEmbeddedSelector = () => {
    return embeddedSelector;
  };

  return {
    setEmbeddedSelector,
    getEmbeddedSelector,
  };
};
