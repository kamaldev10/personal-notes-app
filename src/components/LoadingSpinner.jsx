import React from "react";

const LoadingSpinner = ({ fullscreen = false, size = "md" }) => {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };

  const spinner = (
    <div
      className={`${sizes[size]} border-4 border-current border-t-transparent rounded-full animate-spin opacity-70`}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-(--bg) z-50">
        <div className="flex flex-col items-center gap-3">
          {/* <div className="w-10 h-10 border-4 border-(--accent) border-t-transparent rounded-full animate-spin" /> */}
          {spinner}
          <span className="text-sm text-(--text-muted) animate-pulse">
            Memuat...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex flex-col items-center gap-3">
        {/* <div className="w-8 h-8 border-4 border-(--accent) border-t-transparent rounded-full animate-spin" /> */}
        {spinner}
        <span className="text-sm text-(--text-muted) animate-pulse">
          Memuat...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
