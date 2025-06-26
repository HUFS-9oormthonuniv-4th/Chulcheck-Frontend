import React, { useState, useRef, useEffect } from "react";

import {
  IoQrCodeOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
} from "react-icons/io5";

interface AttendanceQrScanProps {
  onClose: () => void;
  onComplete?: () => void;
}

export default function AttendanceQrScan({
  onClose,
  onComplete,
}: AttendanceQrScanProps) {
  const [step, setStep] = useState<"ready" | "scanning" | "success" | "error">(
    "ready",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [scannedData, setScannedData] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 카메라 시작 함수
  const startCamera = async () => {
    try {
      // 카메라 권한 요청 및 스트림 획득
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // 후면 카메라 우선 사용
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        // 비디오가 로드되면 스캔 시작
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            void videoRef.current.play();
            startScanning();
          }
        };
      }
    } catch (error) {
      console.error("카메라 접근 오류:", error);
      setErrorMessage(
        "카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.",
      );
      setStep("error");
    }
  };

  // QR 코드 스캔 시작 함수
  const startScanning = () => {
    scanIntervalRef.current = setInterval(() => {
      scanQRCode();
    }, 100); // 100ms마다 스캔 시도
  };

  // QR 코드 스캔 함수
  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context || video.videoWidth === 0 || video.videoHeight === 0) return;

    // 캔버스 크기를 비디오 크기에 맞춤
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 비디오 프레임을 캔버스에 그리기
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 이미지 데이터 가져오기
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // 간단한 QR 코드 패턴 감지 (실제 프로젝트에서는 jsQR 라이브러리 사용 권장)
    const qrResult = detectQRPattern(imageData);

    if (qrResult) {
      handleQRDetected(qrResult);
    }
  };

  // QR 코드 패턴 감지 (단순화된 버전)
  const detectQRPattern = (imageData: ImageData): string | null => {
    // 실제로는 jsQR 라이브러리를 사용해야 하지만,
    // 데모를 위해 가상의 QR 데이터를 랜덤하게 반환
    if (Math.random() < 0.01) {
      // 1% 확률로 QR 코드 "감지"
      return `ATTENDANCE_${Date.now()}`; // 출석용 QR 코드 데이터 형식
    }
    return null;
  };

  // QR 코드 감지 처리 함수
  const handleQRDetected = (data: string) => {
    // 스캔 중지
    stopScanning();

    setScannedData(data);

    // QR 코드 데이터 검증
    if (data.startsWith("ATTENDANCE_")) {
      setStep("success");
      // 2초 후 완료 처리
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    } else {
      setErrorMessage("올바른 출석용 QR 코드가 아닙니다.");
      setStep("error");
    }
  };

  // 스캔 중지 함수
  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  // 카메라 중지 함수
  const stopCamera = () => {
    stopScanning();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // 스캔 시작 버튼 클릭 처리
  const handleStartScan = () => {
    setStep("scanning");
    void startCamera();
  };

  // 재시도 버튼 클릭 처리
  const handleRetry = () => {
    setErrorMessage("");
    setStep("scanning");
    void startCamera();
  };

  // 닫기 처리
  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8B8F9C]/80">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button
          className="absolute left-4 top-4 text-[#475569] hover:text-[#334155] focus:outline-none"
          onClick={handleClose}
          aria-label="닫기"
        >
          ← 돌아가기
        </button>

        {/* 안내 텍스트 */}
        <div className="mt-8 mb-2 w-full text-left">
          <div className="text-lg font-extrabold text-[#1E293B]">
            QR 코드로 출석체크
          </div>
          <div className="text-sm text-[#64748B] mt-1">
            {step === "ready" && "카메라를 QR 코드에 맞춰주세요"}
            {step === "scanning" && "QR 코드를 스캔 중입니다..."}
            {step === "success" && "출석체크가 완료되었습니다!"}
            {step === "error" && "오류가 발생했습니다"}
          </div>
        </div>

        {/* 준비 상태 */}
        {step === "ready" && (
          <div className="flex flex-col items-center w-full mt-6">
            <div className="bg-[#F6F8FA] rounded-2xl flex flex-col items-center justify-center min-h-[260px] w-full max-w-xs mb-8 border border-[#E2E8F0]">
              <div className="border-2 border-dashed border-[#3282F0] rounded-xl p-8 mt-8 mb-8">
                <IoQrCodeOutline size={64} className="text-[#3282F0]" />
              </div>
            </div>
            <button
              className="w-full max-w-xs bg-[#3282F0] hover:bg-[#2563EB] text-white text-base font-bold rounded-lg py-3 flex items-center justify-center"
              onClick={handleStartScan}
            >
              <IoQrCodeOutline className="mr-2" size={20} /> 출석하기
            </button>
          </div>
        )}

        {/* 스캔 중 상태 */}
        {step === "scanning" && (
          <div className="flex flex-col items-center w-full mt-6">
            <div className="relative w-full max-w-xs aspect-square bg-black rounded-2xl overflow-hidden">
              {/* 실제 비디오 스트림 */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              {/* 스캔용 캔버스 (숨김) */}
              <canvas ref={canvasRef} className="hidden" />
              {/* 파란색 가이드 박스 */}
              <div className="absolute inset-8 border-4 border-[#3282F0] rounded-xl pointer-events-none animate-pulse" />
              {/* 스캔 라인 애니메이션 */}
              <div className="absolute inset-8 pointer-events-none">
                <div
                  className="w-full h-0.5 bg-[#3282F0] animate-bounce"
                  style={{
                    animation: "scan 2s linear infinite",
                  }}
                />
              </div>
            </div>
            <div className="mt-4 text-[#64748B] text-sm text-center">
              QR 코드를 가이드 박스에 맞춰주세요
              <br />
              <span className="text-xs text-[#94A3B8]">
                자동으로 스캔됩니다
              </span>
            </div>
          </div>
        )}

        {/* 성공 상태 */}
        {step === "success" && (
          <div className="flex flex-col items-center w-full mt-6">
            <div className="bg-[#F0FDF4] rounded-2xl flex flex-col items-center justify-center min-h-[260px] w-full max-w-xs mb-4 border border-[#BBF7D0]">
              <IoCheckmarkCircle size={80} className="text-[#16A34A] mb-4" />
              <div className="text-lg font-bold text-[#16A34A]">출석 완료!</div>
              <div className="text-sm text-[#65A30D] mt-2 text-center px-4">
                출석체크가 성공적으로 완료되었습니다
              </div>
            </div>
            <div className="text-xs text-[#64748B] text-center">
              스캔된 데이터: {scannedData.slice(0, 20)}...
            </div>
          </div>
        )}

        {/* 오류 상태 */}
        {step === "error" && (
          <div className="flex flex-col items-center w-full mt-6">
            <div className="bg-[#FEF2F2] rounded-2xl flex flex-col items-center justify-center min-h-[260px] w-full max-w-xs mb-4 border border-[#FECACA]">
              <IoAlertCircle size={80} className="text-[#DC2626] mb-4" />
              <div className="text-lg font-bold text-[#DC2626]">오류 발생</div>
              <div className="text-sm text-[#B91C1C] mt-2 text-center px-4">
                {errorMessage}
              </div>
            </div>
            <button
              className="w-full max-w-xs bg-[#3282F0] hover:bg-[#2563EB] text-white text-base font-bold rounded-lg py-3"
              onClick={handleRetry}
            >
              다시 시도
            </button>
          </div>
        )}
      </div>

      {/* 스캔 라인 애니메이션을 위한 CSS */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200px);
          }
        }
      `}</style>
    </div>
  );
}
