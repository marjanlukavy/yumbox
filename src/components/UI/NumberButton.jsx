import useItemStore from "../../store/order.store";

function NumberButton() {
  const selectedItems = useItemStore((state) => state.getSelectedItems());
  const totalPrice = Object.values(selectedItems).reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const toggleCart = useItemStore((state) => state.toggleCart);

  return (
    <div
      className="bg-transparent p-0.5 px-1 pr-[16px] border border-white flex items-center gap-2.5 rounded-full cursor-pointer"
      onClick={toggleCart}
    >
      <span className="bg-[#D71515] w-[22px] h-[22px] flex items-center justify-center rounded-full text-[#EBF4E1]">
        {Object.values(selectedItems).reduce(
          (total, item) => total + item.quantity,
          0
        )}
      </span>
      <span className="text-white">{totalPrice.toFixed(2)} грн</span>
    </div>
  );
}

export default NumberButton;
