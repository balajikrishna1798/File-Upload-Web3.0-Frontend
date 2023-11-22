import React from 'react';

const LandingHeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto px-4">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <p className="text-purple-600 font-bold text-sm md:text-md uppercase">
          Inov Market
        </p>
        <h1 className="text-3xl md:text-5xl leading-tight font-bold mt-3">
          Create, sell or collect digital items.
        </h1>
        <p className="text-gray-500 mt-4 leading-6">
          Unit of data stored on a digital ledger, called a blockchain, that
          certifies a digital asset to be unique and therefore not
          interchangeable.
        </p>
        <button className="mt-7 bg-purple-500 font-semibold text-white px-8 py-2 text-sm rounded">
          Explore
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <img src="/nft.png" alt="" className="w-full object-contain" />
      </div>
    </div>
  );
};

export default LandingHeroSection;
