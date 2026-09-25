const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#C2F800]"></span>

        <p className="text-[#9CA3AF] text-sm">
          Loading workouts...
        </p>
      </div>
    </div>
  );
};

export default Loading;