import { ENV, InitializeOptions } from "./types";
import { createStore } from "./store";

import { makeMount } from "./mount";
import { makePay } from "./pay";
import { makeUnmount } from "./unmount";

export namespace InPage {
  /**
   * Initialize the InPage component
   *
   * @param paymentId
   * @param env `test` (sandbox env) or `live`
   */
  export function initialize(
    paymentId: string,
    env: ENV,
    options: InitializeOptions = {}
  ) {
    const store = createStore();

    return {
      mount: makeMount(paymentId, options, store),
      pay: makePay(paymentId, options, store),
      unmount: makeUnmount(paymentId, options, store),
    };
  }
}

// window.addEventListener(
//   "message",
//   (event) => {
//     // if (event.origin === "https://localhost:3000") {
//     console.log(`Fakoo: message from ${event.origin}`, event.data);

//     const payload = event.data.payload;

//     switch (event.data.type) {
//       case "payment_status":
//         $("#payment-status-in-page").text(payload);

//         if (payload === "payment_in_progress" && !isModalOpen) {
//           $("#fragments-modal").modal("show");
//           $("#fragments-modal-iframe").attr("src", IN_MODAL_PAGE_URL);
//           isModalOpen = true;
//         }
//         break;

//       case "installment_selected":
//         $("#amount-in-page").text(payload.installments_count);
//         break;

//       default:
//         console.warn("Weird message type", event.data.type);
//     }
//   },
//   false
// );

// // Click on merchand pay button:
// $("#send-event-to-child").on("click", function (event) {
//   iFrame.contentWindow.postMessage({ type: "user_wants_to_pay", payload: null }, "*");
// });
