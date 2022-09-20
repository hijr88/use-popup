import React from "react";

type colorType = "dark-blue" | "blue" | "light-blue" | "red" | "gray" | "dark-gray" | "black";

interface Button {
  children: React.ReactNode;
  rounded?: boolean;
  textSize?: "text-sm" | "text-base" | "text-lg" | "text-xl";
  fill?: boolean;
  color: colorType;
  fontWeight?: "font-medium" | "font-bold";
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const bgColor: { [key in colorType]: string } = {
  "dark-blue": "bg-dark-blue",
  blue: "bg-blue",
  "light-blue": "bg-light-blue",
  red: "bg-red",
  gray: "bg-[#DCDCDC]",
  "dark-gray": "bg-[#6E6E6E]",
  black: "bg-[#3B3B3B]",
};

const borderColor: { [key in colorType]: string } = {
  "dark-blue": "border-dark-blue",
  blue: "border-blue",
  "light-blue": "border-light-blue",
  red: "border-red",
  gray: "border-[#DCDCDC]",
  "dark-gray": "border-[#6E6E6E]",
  black: "border-[#3B3B3B]",
};

const textColor: { [key in colorType]: string } = {
  "dark-blue": "text-dark-blue",
  blue: "text-blue",
  "light-blue": "text-light-blue",
  red: "text-red",
  gray: "text-[#B5B5B5]",
  "dark-gray": "text-[#6E6E6E]",
  black: "text-[#3B3B3B]",
};

function combineClass({ rounded, textSize, fill, color, fontWeight }: Omit<Button, "children" | "width" | "height">) {
  let className = rounded ? "rounded-full" : "rounded-md";
  className += " " + textSize;
  if (fontWeight) className += " " + fontWeight;

  if (fill) {
    let textColor = "text-white";
    if (color === "gray") {
      textColor = "text-[#888888]";
    }
    return `${className} ${bgColor[color]} ${textColor}`;
  } else {
    return `border bg-white ${className} ${borderColor[color]} ${textColor[color]}`;
  }
}

function Button({ children, rounded = false, textSize = "text-base", fill = false, color, fontWeight, width, height, onClick }: Button) {
  const box: any = {};
  if (width) {
    box.width = width + "px";
  }
  if (height) {
    box.height = height + "px";
  }

  return (
    <button
      className={`flex items-center justify-center px-4 py-1 ${combineClass({ color, fill, rounded, textSize, fontWeight })}`}
      style={box}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {children}
    </button>
  );
}

export default Button;
