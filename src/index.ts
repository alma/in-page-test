export namespace InPage {
  type InPageInitialize = {
    onClose: () => void;
    onFailure: (error: Error) => void;
    onSuccess: () => void;
  };

  export function initialize(
    paymentId: string,
    mode: "TEST" | "PROD",
    { onClose, onFailure, onSuccess }: InPageInitialize
  ) {
    let uuid = Math.random();
    console.log("InPage initialized with uuid", uuid);

    let currentElement: HTMLElement | null = null;

    function embedded(element: HTMLElement) {
      currentElement = element;
      console.log("embedded");
      //TODO innerHTML iframe
    }

    function payMethod(toto: number) {
      console.log(toto);
    }

    function unmount() {
      console.log("unmount", currentElement);
      currentElement = null;
      onClose();
    }
    return {
      pay: () => payMethod(uuid),
      mount: (element: HTMLElement) => embedded(element),
      unmount: () => unmount(),
    };
  }
}
