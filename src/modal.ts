import { style } from "./Modal/modaleStyle";
import closeButton from "./Modal/closeButton.svg";
import almaLogo from "./Modal/logo.svg";

export function showModal() {
  // Just a check to avoid creating multiple modals
  if (document.getElementById("in-page-modal-container")) {
    hideModal();
    return;
  }

  const wrapper = createModalWrapperElement();
  const modalContainer = createModalContainerElement();
  const modalOverlay = createModalOverlayElement();
  const modalBody = createModalBodyElement();
  const modalClose = createModalCloseElement();
  const modalLogo = createModalLogoElement();

  document.body.appendChild(wrapper);
  wrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalOverlay);
  modalContainer.appendChild(modalBody);
  modalBody.appendChild(modalClose);
  modalBody.appendChild(modalLogo);
}

export function hideModal() {
  const modal = document.getElementById("in-page-modal-wrapper");
  if (modal) {
    modal.remove();
  }
}

function createModalWrapperElement() {
  const element = document.createElement("style");
  element.innerHTML = style;
  // We create a wrapper to delete the style tag in the DOM easily
  const wrapper = document.createElement("div");
  wrapper.id = "in-page-modal-wrapper";
  wrapper.appendChild(element);

  return wrapper;
}

function createModalContainerElement() {
  const element = document.createElement("div");
  element.id = "modal-element";

  return element;
}

function createModalOverlayElement() {
  const element = document.createElement("div");
  element.id = "in-page-modal-background";
  return element;
}

function createModalBodyElement() {
  const element = document.createElement("div");
  element.id = "in-page-modal-body";
  // Create the iframe here.
  return element;
}
function createModalCloseElement() {
  const element = document.createElement("img");
  element.id = "in-page-modal-close";
  element.onclick = hideModal;
  element.src = closeButton;

  return element;
}

function createModalLogoElement() {
  const element = document.createElement("img");
  element.id = "in-page-modal-logo";
  element.src = almaLogo;

  return element;
}
