import cls from "classnames";
import React from "react";

interface Props {
  children: React.ReactNode;
  isDark?: boolean;
  close: () => void;
}

const Overlay = ({ children, isDark, close }: Props) => {
  return (
    <div
      className={cls("fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center", { "bg-gray-600 bg-opacity-20": isDark })}
      onClick={() => close()}
    >
      {children}
    </div>
  );
};

export default Overlay;
