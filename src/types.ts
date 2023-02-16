export type ENV =
  | "TEST"
  | "LIVE"
  | "LOCAL"
  | "DEV"
  | "STAGING"
  | "SANDBOX"
  | "PROD";

export type InitializeOptions = {
  environment?: ENV;
  onPaymentSucceeded?: () => void;
  onPaymentRejected?: (error: Error) => void;
  onModalClosed?: () => void;
};

type MessageType = "user_wants_to_pay";

export type Message = {
  type: MessageType;
  hash: string;
  payload?: string;
};
