import Context from "../popup/context";
import { useContext, useMemo } from "react";

const usePopup = () => {
  const popupContext = useContext(Context);
  if (popupContext == null) {
    throw new Error("usePopup must be used within a PopupProvider");
  }

  return useMemo(() => {
    return popupContext;
  }, [popupContext]);
};

export default usePopup;
