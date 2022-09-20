import Context from "../popup/context";
import { useContext, useMemo } from "react";

const usePopup = () => {
  const popupContext = useContext(Context)!;
  return useMemo(() => {
    return popupContext;
  }, [popupContext]);
};

export default usePopup;
