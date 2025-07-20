import { useEffect, useState } from "react";

const ProgressBar = ({ width }: { width: number }) => {
  const [animatedProgress, setAnimatedProgress] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(width);
    }, 200);
  });
  return (
    <div className="border rounded-full bg-white w-full overflow-hidden border-gray-400">
      <div
        className={`rounded-full transition ease-in duration-[2000ms] font-medium ${getProgressBarColor(
          animatedProgress
        )}  h-6 text-white text-right`}
        style={{ transform: `translateX(${animatedProgress - 100}%)` }}
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={animatedProgress}
        aria-label="progress-bar"
      >
        <span className="px-2">{animatedProgress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

const getProgressBarColor = (width: number) => {
  switch (true) {
    case width >= 0 && width < 30:
      return "bg-red-500";
    case width >= 30 && width < 70:
      return "bg-orange-400";
    case width >= 70:
      return "bg-green-400";
    default:
      return "bg-gray-200";
  }
};
