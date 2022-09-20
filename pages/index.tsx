import Button from "../components/button";
import usePopup from "../libs/popup/usePopup";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { alert, confirm } = usePopup();

  return (
    <>
      <Head>
        <title>팝업 예제</title>
      </Head>

      <main>
        <div className="inline-flex flex-col space-y-8 p-16">
          <div className="relative inline-flex flex-col gap-y-4 border p-4 py-6">
            <h1 className="absolute -top-4.5 inline-block bg-white text-2xl font-bold text-light-black">Alert</h1>
            <div className="flex gap-4">
              <Button
                color="dark-blue"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.");
                }}
              >
                기본 값
              </Button>
              <Button
                color="dark-blue"
                onClick={() => {
                  alert(
                    "여기에 알릴 내용을 입력하세요. 여기에 알릴 내용을 입력하세요. 여기에 알릴 내용을 입력하세요. 여기에 알릴 내용을 입력하세요. 여기에 알릴 내용을 입력하세요."
                  );
                }}
              >
                긴 메시지
              </Button>
              <Button
                color="dark-blue"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { title: "타이틀" });
                }}
              >
                타이틀
              </Button>
              <Button
                color="dark-blue"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { title: "입력해주세요. 입력해주세요. 입력해주세요. 입력해주세요. 입력해주세요." });
                }}
              >
                긴 타이틀
              </Button>
              <Button
                color="dark-blue"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { timeout: 2000 });
                }}
              >
                2초뒤 자동 꺼짐
              </Button>
              <Button
                color="dark-blue"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { isDarkOverlay: false });
                }}
              >
                어두운 배경 제거
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                color="red"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { type: "WARNING", title: "경고" });
                }}
              >
                WARNING
              </Button>
              <Button
                color="red"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { type: "WARNING", enableOverlayClose: false });
                }}
              >
                overlay 클릭해도 안꺼짐
              </Button>
              <Button
                color="red"
                onClick={() => {
                  alert("여기에 알릴 내용을 입력하세요.", { type: "WARNING", confirmText: "버튼명 변경" });
                }}
              >
                기본 확인 버튼명 변경
              </Button>
            </div>
          </div>

          <div className="relative inline-flex flex-col gap-y-4 border p-4 py-6">
            <h1 className="absolute -top-4.5 inline-block bg-white text-2xl font-bold text-light-black">Confirm</h1>
            <div className="flex gap-4">
              <Button
                color="dark-blue"
                onClick={async () => {
                  const a = await confirm("여기에 알릴 내용을 입력하세요.", {});
                  console.log(a);
                  if (a) {
                    console.log("확인!!");
                  } else {
                    console.log("취소!!");
                  }
                }}
              >
                default
              </Button>
              <Button
                color="dark-blue"
                onClick={async () => {
                  await confirm("...", { closeText: "닫기 버튼명" });
                }}
              >
                닫기 버튼명 변경
              </Button>
              <Button
                color="dark-blue"
                onClick={async () => {
                  const a = await confirm("...", {
                    title: "추가할 옵션 추천 바람! 🙏🙏🙏",
                    enableOverlayClose: false,
                    confirmText: "OK",
                    closeText: "NO",
                  });
                  if (a) {
                    alert("👍👍👍👍👍");
                  } else {
                    alert("😭😡😰🥵");
                  }
                }}
              >
                옵션
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                color="red"
                onClick={async () => {
                  const a = await confirm("예약 취소시 복구가 불가힙니다.", {
                    type: "WARNING",
                    title: "선택한 내역을 취소하시겠습니까?",
                    confirmText: "삭제",
                  });
                  if (a) {
                    console.log("확인!!");
                  } else {
                    console.log("취소!!");
                  }
                }}
              >
                WARNING
              </Button>
              <Button
                color="red"
                onClick={async () => {
                  const a = await confirm("예약 취소시 복구가 불가힙니다.", {
                    type: "WARNING",
                    title: "선택한 내역을 취소하시겠습니까?",
                    confirmText: "삭제",
                    reverserButton: true,
                  });
                  if (a) {
                    console.log("확인!!");
                  } else {
                    console.log("취소!!");
                  }
                }}
              >
                확인 / 닫기 버튼 reverse
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
