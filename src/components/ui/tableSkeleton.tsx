const GlobalTableSkeleton = () => {
  return (
    <div className="p-4 mt-6 bg-white rounded shadow">
      <div className="animate-pulse">
        {/* Skeleton elementlari */}
        <div className="flex justify-between mb-4">
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="col-span-5 bg-gray-200 rounded h-10"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalTableSkeleton;
