import React from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useItemStore from "../../store/order.store";
import "swiper/swiper-bundle.css";
import predefinedItems from "../../utils/constants";
import { Navigation } from "swiper/modules";

SwiperCore.use([Navigation]);

const CardWithSlider = () => {
  const addItemToCart = useItemStore((state) => state.addItem);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  return (
    <div className="mt-10 rounded-lg overflow-hidden ">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 60,
          },
        }}
        style={{ height: "550px" }}
      >
        {predefinedItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[550px] object-cover cursor-pointer"
                onClick={() => handleAddToCart(item)}
              />
              {item.showLabel ? (
                <img
                  src="/assets/tasty.svg"
                  alt="Tasty"
                  className="absolute top-0 left-0 w-30 h-30"
                />
              ) : null}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
                <h2 className="text-white text-lg font-bold">{item.name}</h2>
                <p className="text-white text-sm">{item.description}</p>
                <button
                  className="bg-white text-black py-2 px-4 mt-2 rounded-md"
                  onClick={() => handleAddToCart(item)}
                >
                  Добавити в кошик
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardWithSlider;
