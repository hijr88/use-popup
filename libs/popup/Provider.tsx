import Alert from "./components/Alert";
import Confirm from "./components/Confirm";
import Overlay from "./components/Overlay";
import Context from "./context";
import { ConfirmOption, IAlert, IConfirm, Option, Popup, PopupType } from "./types";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  type?: PopupType;
  isDarkOverlay?: boolean;
  enableOverlayClose?: boolean;
  timeout?: number;
}

function Provider({ children, type = "INFO", isDarkOverlay = true, enableOverlayClose = true, timeout = 0 }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const timerId = useRef<number | null>(null);
  const [popup, setPopup] = useState<Popup | null>(null);
  const router = useRouter();

  useEffect(() => {
    const div = document.createElement("div");
    root.current = div;
    div.id = "yh__pop";
    document.body.appendChild(div);

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      if (root.current) document.body.removeChild(div);
    };
  }, []);

  useEffect(() => {
    setPopup(null);
  }, [router]);

  useEffect(() => {
    if (popup === null) {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    }
  }, [popup]);

  const finalOption = useCallback(
    (option: Option): Option => {
      return {
        type: option.type || type,
        isDarkOverlay: option.isDarkOverlay || isDarkOverlay,
        enableOverlayClose: option.enableOverlayClose || enableOverlayClose,
        timeout: option.timeout || timeout,
        ...option,
      };
    },
    [enableOverlayClose, isDarkOverlay, timeout, type]
  );

  const alert = useCallback(
    (message: string, option: Option = {}) => {
      function alertClose() {
        setPopup(null);
        if (option.onClose) option.onClose();
      }

      const alert: IAlert = {
        message,
        option: finalOption(option),
        close: alertClose,
      };

      if (alert.option.timeout) {
        timerId.current = window.setTimeout(() => {
          alert.close();
        }, alert.option.timeout);
      }

      setPopup(alert);
      if (alert.option.onOpen) alert.option.onOpen();
    },
    [finalOption]
  );

  const confirm = useCallback(
    (message: string, option: ConfirmOption = {}) => {
      return new Promise<boolean>((resolve) => {
        function confirmClose(resolveValue: boolean) {
          setPopup(null);
          resolve(resolveValue);
          if (option.onClose) option.onClose();
        }

        const confirm: IConfirm = {
          message,
          option: finalOption(option),
          close: confirmClose,
        };

        if (confirm.option.timeout) {
          timerId.current = window.setTimeout(() => {
            confirm.close(false);
          }, confirm.option.timeout);
        }

        setPopup(confirm);
        if (confirm.option.onOpen) confirm.option.onOpen();
      });
    },
    [finalOption]
  );

  function isAlert(popup: Popup) {
    return popup.close.name === "alertClose";
  }

  return (
    <Context.Provider value={{ alert, confirm }}>
      {children}
      {root.current &&
        createPortal(
          popup && (
            <Overlay
              isDark={popup.option.isDarkOverlay}
              close={
                popup.option.enableOverlayClose
                  ? () => {
                      if (isAlert(popup)) {
                        popup.close();
                      } else {
                        popup.close(false);
                      }
                    }
                  : () => {}
              }
            >
              {isAlert(popup) ? <Alert {...popup} /> : <Confirm {...popup} />}
            </Overlay>
          ),
          root.current
        )}
    </Context.Provider>
  );
}

export default Provider;
