import { style } from "./Modal/modaleStyle";
import closeButton from "./Modal/closeButton.svg";
import almaLogo from "./Modal/logo.svg";
import { idPrefix } from "./Modal/helper";

export function showModal() {
  // Just a check to avoid creating multiple modals
  if (document.getElementById(`${idPrefix}-wrapper`)) {
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
  const modal = document.getElementById(`${idPrefix}-wrapper`);
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
  wrapper.id = `${idPrefix}-wrapper`;
  wrapper.role = "dialog";
  wrapper.ariaModal = "true";
  wrapper.appendChild(element);

  return wrapper;
}

function createModalContainerElement() {
  const element = document.createElement("div");
  element.id = `${idPrefix}-element`;

  return element;
}

function createModalOverlayElement() {
  const element = document.createElement("div");
  element.id = `${idPrefix}-background`;
  return element;
}

function createModalBodyElement() {
  const element = document.createElement("div");
  element.id = `${idPrefix}-body`;

  return element;
}

function createIframeElement() {
  const element = document.createElement("iframe");
  element.id = `${idPrefix}-iframe`;
  element.allow = "camera *;";
  element.src = "https://almapay.com";
  element.title = "Alma payment iframe";

  return element;
}

function createModalCloseElement() {
  const element = document.createElement("img");
  element.id = `${idPrefix}-close`;
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
  element.id = `${idPrefix}-logo`;
  element.title = "Alma logo";
  element.src = almaLogo;

  return element;
}
