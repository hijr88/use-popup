import { ConfirmOption, Option } from "./types";
import { createContext } from "react";

interface Return {
  alert(message: string, option?: Option): void;
  confirm(message: string, option?: ConfirmOption): Promise<boolean>;
}

export default createContext<Return | null>(null);
