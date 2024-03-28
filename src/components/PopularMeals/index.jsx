import React from "react";
import useItemStore from "../../store/order.store";
import predefinedItems from "../../utils/constants";
import PopularMealItem from "./PopularMealItem";

const PopularMeals = () => {
  return (
    <section>
      <h2 className="text-white text-center text-[34px] font-bold mt-10">
        Найчастіше замовляють
      </h2>
      <div className="py-[75px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {predefinedItems.map((item) => (
          <PopularMealItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularMeals;
