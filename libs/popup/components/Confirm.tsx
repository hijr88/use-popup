import { IConfirm } from "../types";
import Button from "@components/button";
import cls from "classnames";

function Confirm({
  message,
  close,
  option: { title = "", confirmText = "확인", type = "INFO", reverserButton = false, closeText = "닫기" },
}: IConfirm) {
  function onConfirm() {
    close(true);
  }

  function onClose() {
    close(false);
  }

  return (
    <div
      className={cls(
        "min-w-[450px] rounded-2xl border p-[30px] shadow-[0_0_10px_#00000029]",
        { "bg-white": type === "INFO" },
        { "border-[#F38282] bg-[#FFF5F5]": type === "WARNING" }
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-end">
        <button onClick={onClose}>
          <svg
            className={cls("h-6 w-6", { "text-red": type === "WARNING" })}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {title && (
        <div className="mt-4 flex justify-center">
          <h1
            className={cls("text-[23px] font-bold", {
              "text-black": type === "INFO",
              "text-red": type === "WARNING",
            })}
          >
            {title}
          </h1>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <p className="whitespace-pre-wrap text-[15px] text-[#565656]">{message}</p>
      </div>
      <div className={cls("mt-11 flex justify-center gap-6", { "flex-row-reverse": reverserButton })}>
        {type === "INFO" && (
          <>
            <Button color="dark-blue" fill={true} width={129} height={50} onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button color="dark-blue" width={129} height={50} onClick={onClose}>
              {closeText}
            </Button>
          </>
        )}
        {type === "WARNING" && (
          <>
            <Button color="red" fill={true} width={129} height={50} onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button color="red" width={129} height={50} onClick={onClose}>
              {closeText}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Confirm;
