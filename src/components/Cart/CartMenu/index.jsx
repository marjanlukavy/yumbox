import React from "react";
import useItemStore from "../../../store/order.store";
import { FaBucket } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const CartMenu = () => {
  const selectedItems = useItemStore((state) => state.getSelectedItems());
  const isCartOpen = useItemStore((state) => state.isCartOpen);
  const removeItem = useItemStore((state) => state.removeItem);
  const changeItemQuantity = useItemStore((state) => state.changeItemQuantity);
  const toggleCart = useItemStore((state) => state.toggleCart);

  const totalPrice = Object.values(selectedItems).reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );

  let discountedPrice = totalPrice;
  let discountApplied = false;
  if (totalPrice > 1000) {
    discountedPrice *= 0.9;
    discountApplied = true;
  }

  const placeOrder = () => {
    const orderArray = Object.values(selectedItems).map((item) => ({
      name: item.name,
      quantity: item.quantity,
      pricePerUnit: item.price,
      totalPrice: parseInt(item.price) * item.quantity,
    }));
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full md:w-[450px] w-full bg-black z-50 flex flex-col ${
        isCartOpen ? "block" : "hidden"
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">Корзина</h2>
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => toggleCart()}
        >
          <IoMdCloseCircle />
        </button>
      </div>
      <div
        className="flex flex-col gap-2 p-4 overflow-y-auto"
        style={{ maxHeight: "500px" }}
      >
        {Object.values(selectedItems).map((item) => (
          <div
            key={item.id}
            className="bg-[#222222] rounded-md flex flex-col gap-4 justify-between transition duration-300 hover:bg-[#333333]"
          >
            <div className="flex items-center gap-4 p-4">
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="text-white">{item.name}</h3>
                <span className="text-[#eaeaea] text-[14px]">
                  {item.weight}
                </span>
              </div>

              <FaBucket
                color="#FCB852"
                className="ml-auto hover:text-gray-300 cursor-pointer"
                onClick={() => removeItem(item.id)}
              />
            </div>
            <div className="border-t-2 border-black flex items-center p-4">
              <div className="flex gap-4 items-center w-full justify-between">
                <div className="text-white text-[24px]">
                  {parseInt(item.price) * item.quantity} грн
                </div>
                <div className="flex items-center text-white">
                  <button
                    className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-colors hover:bg-gray-800"
                    onClick={() =>
                      changeItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-colors hover:bg-gray-800"
                    onClick={() =>
                      changeItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#222222] rounded-t-md p-[30px] mt-auto">
        <div className="flex items-center justify-between text-white">
          <span>Доставка</span>
          <span>
            {discountApplied ? discountedPrice.toFixed(2) : totalPrice} грн
          </span>
        </div>
        {discountApplied && (
          <div className="flex items-center justify-between text-white mt-2">
            <span>
              Промокод: <span className="text-[#dc3c3c]">10% знижка</span>
            </span>
          </div>
        )}
        <button
          className="w-full bg-[#FCB852] py-6 text-black mt-4 rounded-full"
          onClick={placeOrder}
        >
          Оформити за{" "}
          {discountApplied ? discountedPrice.toFixed(2) : totalPrice} грн
        </button>
      </div>
    </aside>
  );
};

export default CartMenu;
