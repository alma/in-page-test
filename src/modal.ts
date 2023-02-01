export function showModal() {
  // Just a check to avoid creating multiple modals
  if (document.getElementById("in-page-modal-container")) {
    hideModal();
    return;
  }

  const modal = createModalContainerElement();
  const modalOverlay = createModalOverlayElement();
  const modalBody = createModalBodyElement();
  const modalClose = createModalCloseElement();

  modal.appendChild(modalOverlay);
  modal.appendChild(modalBody);
  modalBody.appendChild(modalClose);

  document.body.appendChild(modal);
}

export function hideModal() {
  const modal = document.getElementById("in-page-modal-container");
  if (modal) {
    modal.remove();
  }
}

function createModalContainerElement() {
  const style = `
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const styleContainer = document.createElement("style");
  styleContainer.innerHTML = `
    #in-page-modal-container {
      position: fixed;
      background: red !important;
    }

    @media (max-width: 768px) {
      #in-page-modal-container {
        background: blue !important;
      }
    }
  `;
  const element = document.createElement("div");
  element.id = "in-page-modal-container";
  element.setAttribute("style", style);
  // TODO create a div above all and add the style to it so that it's removed when the modal is removed
  document.body.appendChild(styleContainer);
  return element;
}

function createModalOverlayElement() {
  const modalBackgroundStyle = `
    position: absolute;
    background: #2A2A2A;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  `;

  const element = document.createElement("div");
  element.id = "in-page-modal-background";
  element.setAttribute("style", modalBackgroundStyle);
  return element;
}

function createModalBodyElement() {
  const modalBodyStyle = `
    border-radius: 10px;
    background: #fff;
    position: relative;
    padding: 30px;
    min-width: 800px;
    min-height: 500px;
  `;

  const element = document.createElement("div");
  element.id = "in-page-modal-body";
  element.setAttribute("style", modalBodyStyle);
  // Create the iframe here.
  return element;
}
function createModalCloseElement() {
  const modalCloseStyle = `
    position: absolute;
    right: 15px;
    top: 15px;
    outline: none;
    appearance: none;
    color: red;
    background: none;
    border: 0px;
    font-weight: bold;
    cursor: pointer;
  `;

  const element = document.createElement("div");
  element.id = "in-page-modal-close";
  element.setAttribute("style", modalCloseStyle);
  element.onclick = hideModal;
  element.innerHTML = "X";

  return element;
}
