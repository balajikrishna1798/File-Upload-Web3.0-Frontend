import React from 'react'

const LandingHeroSection = () => {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto">
    <div className="w-1/2">
      <p className="text-purple-600 font-bold text-md uppercase">
        Inov Market
      </p>
      <h1 className="text-5xl leading-tight font-bold mt-3">
        Create, sell or collect digital items.
      </h1>
      <p className="text-gray-500 mt-4 leading-6">
        Unit of data stored on a digital ledger, called a blockchain, that
        certifies a digital asset to be unique and therefore not
        interchangeable.
      </p>
      <button className="mt-7 bg-purple-500 font-semibold text-white px-8 py-1 text-sm rounded">
        Explore
      </button>
    </div>
    {/* Image/Icon Area */}
    <div className="w-1/2">
      <img src="/nft.png" alt="" className="w-full  object-fit" />
    </div>
  </div>
  )
}

export default LandingHeroSection