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
  const iframe = createIframeElement();

  document.body.appendChild(wrapper);
  wrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalOverlay);
  modalContainer.appendChild(modalBody);
  modalBody.appendChild(modalClose);
  modalBody.appendChild(modalLogo);
  modalBody.appendChild(iframe);
}

export function hideModal() {
  const modal = document.getElementById("in-page-modal-wrapper");
  if (modal) {
    if (confirm("Are you sure you want to leave the payment page ?")) {
      modal.remove();
    }
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

  return element;
}

function createIframeElement() {
  const element = document.createElement("iframe");
  element.id = "in-page-modal-iframe";
  element.allow = "camera *;";
  element.src = "https://almapay.com";
  return element;
}

function createModalCloseElement() {
  const element = document.createElement("img");
  element.id = "in-page-modal-close";
  element.title = "Close the alma modal (you'll lose your data)";
  element.onclick = hideModal;
  element.onkeyup = (event) => {
    if (event.key === "Enter") {
      hideModal();
    }
  };

  element.src = closeButton;
  element.tabIndex = 0;
  return element;
}

function createModalLogoElement() {
  const element = document.createElement("img");
  element.id = "in-page-modal-logo";
  element.title = "Alma logo";
  element.src = almaLogo;

  return element;
}
