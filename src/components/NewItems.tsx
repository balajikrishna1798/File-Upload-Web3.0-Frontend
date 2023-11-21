import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

const items = [
  // Assuming this is your data structure
  { id: 1, name: "Pinky Ocean", likes: 51, image: "/background-image.png" },
  { id: 2, name: "Deep Sea Phantasy", likes: 81, image: "/background-image.png" },
  { id: 3, name: "Rainbow Style", likes: 51, image: "/background-image.png" },
  { id: 4, name: "Two Tigers", likes: 81, image: "/background-image.png" },
  { id: 5, name: "Granden Lamb", likes: 41, image: "/background-image.png" },

];

const NewCollections = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [itemLikes, setItemLikes] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: { liked: false, count: item.likes } }), {})
  );

  const toggleLike = (itemId) => {
    setItemLikes((prevLikes) => ({
      ...prevLikes,
      [itemId]: {
        liked: !prevLikes[itemId].liked,
        count: prevLikes[itemId].liked ? prevLikes[itemId].count - 1 : prevLikes[itemId].count + 1,
      },
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-7">New Items</h2>
      <Slider {...settings}>
       
        {items.map((item) => (
          <div key={item.id} className="p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-8 py-10 relative">
              <img
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="rounded"
              />
              <div className="absolute z-20 top-5  left-4 ">
                  <div className="rounded-full bg-white border-2 border-white">
                    <Image
                      src="/dummy-profile-image-1.jpg"
                      width={40}
                      height={40}
                      alt=""
                      className="rounded-full aspect-square w-[50px]"
                    />
                  </div>
                </div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm mt-2 tracking-wide font-semibold mb-2">
                  {item.name}
                </h3>
                <Icon
                  icon="ph:dots-three"
                  fontSize={24}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                0.08 ETH{" "}
                <span className="text-black font-semibold ml-1">1/20</span>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-purple-600 font-semibold cursor-pointer">
                  Place a bid
                </p>
              <button
                className="flex items-center space-x-2"
                onClick={() => toggleLike(item.id)}
              >
                <Icon
                  icon={itemLikes[item.id].liked ? "heroicons:heart-solid" : "ant-design:heart-outlined"}
                  className={`w-4 h-4 transition duration-200 ease-in-out ${itemLikes[item.id].liked ? "text-red-500" : "text-gray-500"}`}
                />
                <span className="text-[12px] text-gray-700">{itemLikes[item.id].count}</span>
              </button>
              </div>
            </div>
          </div>
          </div>
        ))}

      </Slider>
    </div>
  );
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    >
      <Icon
        icon="bi:arrow-right-circle-fill"
        style={{ fontSize: "24px" }}
        className="cursor-pointer"
      />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    >
      <Icon
        icon="bi:arrow-left-circle-fill"
        style={{ fontSize: "24px" }}
        className="cursor-pointer"
      />
    </div>
  );
}

export default NewCollections;
