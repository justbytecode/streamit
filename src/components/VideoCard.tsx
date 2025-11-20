"use client";
import Image from "next/image";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";
import { useState } from "react";

const VideoCard = ({
  id,
  title,
  thumbnail,
  userImg,
  username,
  createdAt,
  views,
  visibility,
  duration,
}: VideoCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Link 
      href={`/video/${id}`} 
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100/40 bg-white shadow-sm transition-all duration-300 hover:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1"
    >
      {/* Thumbnail Container with Overlay Effect */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={thumbnail}
          width={400}
          height={225}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
          <div className="scale-0 rounded-full bg-white/90 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
            <svg 
              className="h-8 w-8 text-pink-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2.5 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">
              {Math.ceil(duration / 60)}min
            </span>
          </div>
        )}

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 group-hover:opacity-100"
          title="Copy link"
        >
          <Image
            src={copied ? "/assets/icons/checkmark.svg" : "/assets/icons/link.svg"}
            alt="Copy Link"
            width={16}
            height={16}
            className="transition-transform"
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3 p-4">
        {/* User Info Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100/50 transition-all group-hover:ring-pink-500/30">
              <ImageWithFallback
                src={userImg}
                width={36}
                height={36}
                alt={username}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {username}
              </h3>
              <p className="text-xs font-medium capitalize text-gray-500">
                {visibility}
              </p>
            </div>
          </div>

          {/* Views Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 transition-colors group-hover:bg-pink-50">
            <Image
              src="/assets/icons/eye.svg"
              alt="views"
              width={14}
              height={14}
              className="opacity-60"
            />
            <span className="text-xs font-semibold text-gray-600 group-hover:text-pink-600">
              {views}
            </span>
          </div>
        </div>

        {/* Title and Date */}
        <div>
          <h2 className="mb-1 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-pink-600">
            {title}
          </h2>
          <p className="text-xs font-medium text-gray-500">
            {createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Gradient Border Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to from-pink-500/20 to-purple-500/20 blur-xl" />
      </div>
    </Link>
  );
};

export default VideoCard;