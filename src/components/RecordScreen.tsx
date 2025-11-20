"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import { ICONS } from "@/constants";

const RecordScreen = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();
    if (recordedVideoUrl && videoRef.current)
      videoRef.current.src = recordedVideoUrl;
  };

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );
    router.push("/upload");
    closeModal();
  };

  return (
    <div className="record">
      <button 
        onClick={() => setIsOpen(true)} 
        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span className="truncate">Record a video</span>
        </span>
        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      {isOpen && (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeModal} 
          />
          
          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Screen Recording</h3>
              </div>
              <button 
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-gray-100"
              >
                <Image src={ICONS.close} alt="Close" width={20} height={20} />
              </button>
            </div>

            {/* Content Area */}
            <section className="p-6">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                {isRecording ? (
                  <div className="flex flex-col items-center justify-center gap-6 py-24">
                    <div className="relative">
                      {/* Pulsing Effect */}
                      <div className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75" />
                      <div className="relative h-16 w-16 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">Recording in progress...</span>
                      <span className="text-sm font-medium text-gray-500">Capture your screen content</span>
                    </div>
                  </div>
                ) : recordedVideoUrl ? (
                  <video 
                    ref={videoRef} 
                    src={recordedVideoUrl} 
                    controls 
                    className="w-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-24">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-100">
                      <svg className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-base font-medium text-gray-600">Click record to start capturing your screen</p>
                  </div>
                )}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 border-t border-gray-100 px-6 py-5">
              {!isRecording && !recordedVideoUrl && (
                <button 
                  onClick={handleStart} 
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 active:scale-95"
                >
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={18}
                    height={18}
                  />
                  Start Recording
                </button>
              )}
              
              {isRecording && (
                <button 
                  onClick={stopRecording} 
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:shadow-xl hover:shadow-red-500/40 active:scale-95"
                >
                  <div className="h-4 w-4 rounded-sm bg-white" />
                  Stop Recording
                </button>
              )}
              
              {recordedVideoUrl && (
                <>
                  <button 
                    onClick={recordAgain} 
                    className="rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95"
                  >
                    Record Again
                  </button>
                  <button 
                    onClick={goToUpload} 
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 active:scale-95"
                  >
                    <Image
                      src={ICONS.upload}
                      alt="Upload"
                      width={16}
                      height={16}
                      className="brightness-0 invert"
                    />
                    Continue to Upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;