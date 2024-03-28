import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import useItemStore from "../../../store/order.store";

const PopularMealItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const selectedItems = useItemStore((state) => state.getSelectedItems());
  const addItemToStore = useItemStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItemToStore(item);
  };

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={item.image} alt="Meal" />
      <h3 className="text-white mt-12">{item.name}</h3>
      <span className="text-[#eaeaea]">{item.weight}</span>
      {selectedItems[item.id] && (
        <button
          className="bg-transparent flex items-center justify-center gap-4 text-white w-full py-4 rounded-full border border-white transition-all duration-300 hover:bg-white hover:text-black"
          onClick={handleAddToCart}
        >
          <FaCheck color="#52FC96" />В кошику {selectedItems[item.id].quantity}{" "}
          шт за{" "}
          {parseInt(selectedItems[item.id].price) *
            selectedItems[item.id].quantity}{" "}
          грн
        </button>
      )}
      {isHovered && !selectedItems[item.id] ? (
        <button
          className="bg-transparent text-white w-full py-4 rounded-full border border-white transition-all duration-300 hover:bg-white hover:text-black"
          onClick={handleAddToCart}
        >
          Добавити в кошик
        </button>
      ) : selectedItems[item.id] ? null : (
        <span className="font-bold text-white text-[18px]">{item.price}</span>
      )}
    </div>
  );
};

export default PopularMealItem;
