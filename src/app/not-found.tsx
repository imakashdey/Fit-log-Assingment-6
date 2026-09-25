import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-black text-center px-5">
      <h1 className="text-[#C2F800] text-7xl md:text-9xl font-bold">
        404
      </h1>

      <h2 className="text-white text-2xl md:text-3xl font-bold mt-4">
        WORKOUT NOT FOUND
      </h2>

      <p className="text-[#9CA3AF] mt-3 max-w-md">
        The page you are looking for does not exist or the workout could not
        be found.
      </p>

      <Link
        href="/"
        className="mt-6 bg-[#C2F800] hover:bg-[#A8D600] text-black font-bold px-6 py-3 rounded-md transition"
      >
        GO TO WORKOUTS
      </Link>
    </div>
  );
};

export default NotFound;