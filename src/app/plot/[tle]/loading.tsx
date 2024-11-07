export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      {/* Spinner */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold text-gray-600">
        Loading, please wait...
      </p>
    </div>
  );
}
