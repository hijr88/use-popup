export type PopupType = "INFO" | "WARNING";

export interface Option {
  title?: string;
  confirmText?: string;
  type?: PopupType;
  isDarkOverlay?: boolean;
  enableOverlayClose?: boolean;
  //milliseconds
  timeout?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ConfirmOption extends Option {
  closeText?: string;
  reverserButton?: boolean;
}

export interface Popup {
  message: string;
  option: Option;
  close: (...args: any[]) => void;
}

export interface IAlert extends Popup {
  close: () => void;
}

export interface IConfirm extends Popup {
  option: ConfirmOption;
  close: (resolveValue: boolean) => void;
}
