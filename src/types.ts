export type ENV = "TEST" | "LIVE";

export type InitializeOptions = {
  onClose?: () => void;
  onFailure?: (error: Error) => void;
  onSuccess?: () => void;
};
