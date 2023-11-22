import React from "react";

const BrowseCategory = () => {
  return (
    <div className="max-w-screen-xl mx-auto mb-5 mt-4">
      <h1 className="text-center text-2xl font-bold">Browse By Category</h1>
      <div className="flex gap-4 mt-10 justify-between items-center">
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Art</p>
        </div>
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Music</p>
        </div>
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Domain Names</p>
        </div>
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Art</p>
        </div>
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Trading Cards</p>
        </div>
        <div className="bg-blue-50 w-2/12 text-[#606060] hover:text-white cursor-pointer flex justify-center transition-all hover:bg-[#403f83]">
          <p className="p-10 font-semibold">Collectibles</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
