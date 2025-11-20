import Image from "next/image";

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => (
  <section className="flex flex-col gap-2">
    <label 
      htmlFor={id}
      className="text-sm font-bold text-gray-700"
    >
      {label}
    </label>
    <input
      type="file"
      id={id}
      accept={accept}
      hidden
      ref={inputRef}
      onChange={onChange}
    />

    {!previewUrl ? (
      <div 
        onClick={() => inputRef.current?.click()}
        className="group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white transition-all hover:border-pink-500/50 hover:bg-pink-50/30"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-purple-100/20" />
        </div>

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg transition-transform group-hover:scale-110">
          <Image
            src="/assets/icons/upload.svg"
            alt="Upload Icon"
            width={28}
            height={28}
            className="opacity-70"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-bold text-gray-700 group-hover:text-pink-600">
            Click to upload your {id}
          </p>
          <p className="text-xs font-medium text-gray-400">
            {type === "video" ? "MP4, WebM, or MOV" : "PNG, JPG, or GIF"}
          </p>
        </div>
      </div>
    ) : (
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-lg">
        {type === "video" ? (
          <video 
            src={previewUrl} 
            controls 
            className="h-64 w-full object-contain"
          />
        ) : (
          <div className="relative h-64 w-full">
            <Image 
              src={previewUrl} 
              alt={`Selected ${id}`} 
              fill 
              className="object-contain"
            />
          </div>
        )}
        
        {/* File Name & Remove Button */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <p className="truncate text-sm font-semibold text-white">
            {file?.name}
          </p>
          <button 
            type="button" 
            onClick={onReset}
            className="group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-red-500"
          >
            <Image
              src="/assets/icons/close.svg"
              alt="Remove"
              width={14}
              height={14}
              className="opacity-70 group-hover:opacity-100"
            />
          </button>
        </div>
      </div>
    )}
  </section>
);

export default FileInput;