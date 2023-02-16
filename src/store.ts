import { ENV } from "./types";

type Selector = string | null;

export type Store = {
  setEmbeddedSelector: (selector: Selector) => void;
  getEmbeddedSelector: () => Selector;
  getIsCheckoutLoaded: () => boolean;
  setIsCheckoutLoaded: (status: boolean) => void;
  getEnvironment: () => ENV;
  getPaymentId: () => string;
};

export const createStore: (paymentId: string, environment?: ENV) => Store = (
  paymentId,
  environment = "LIVE"
) => {
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

  const getEnvironment = () => {
    return environment;
  };

  const getPaymentId = () => {
    return paymentId;
  };

  return {
    setEmbeddedSelector,
    getEmbeddedSelector,
    setIsCheckoutLoaded,
    getIsCheckoutLoaded,
    getEnvironment,
    getPaymentId,
  };
};
