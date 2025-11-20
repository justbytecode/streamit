import Image from "next/image";

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gradient-to from-gray-50 to-white px-8 py-16 shadow-sm">
      {/* Icon Container */}
      <div className="relative mb-6">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="absolute inset-0 rounded-full bg-pink-100/30 blur-2xl" />
        </div>
        <div className="absolute inset-0 -z-20 animate-pulse animation-delay-150">
          <div className="absolute inset-0 scale-125 rounded-full bg-purple-100/20 blur-3xl" />
        </div>
        
        {/* Icon */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to from-pink-50 to-purple-50 shadow-lg ring-4 ring-white">
          <Image 
            src={icon} 
            alt="icon" 
            width={48} 
            height={48}
            className="opacity-70"
          />
        </div>
      </div>

      {/* Content */}
      <article className="flex max-w-md flex-col items-center gap-3 text-center">
        <h1 className="text-2xl font-black tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="text-base font-medium leading-relaxed text-gray-500">
          {description}
        </p>
      </article>

      {/* Decorative Elements */}
      <div className="mt-8 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      </div>
    </section>
  );
};

export default EmptyState;