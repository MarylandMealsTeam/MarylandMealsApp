import { router } from "expo-router";
import { memo } from "react";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import Meal from "@/interfaces/Meal";
import HorizontalMacroView from "../widgets/HorizontalMacroView";
import FoodAllergenView from "../widgets/FoodAllergenView";
import LoadingSpinner from "../widgets/LoadingSpinner";

export default function FoodCard({ item, quantity }: { item: Meal, quantity?: number }) {

  if (!item) {
    console.log("item is undefined");
    return <LoadingSpinner />;
  }

  const food = item.menu_item;
  const allergens = food.allergens;

  const onPress = () => {
    router.push({ pathname: "/menu/[id]", params: { id: food.id } });
  };

  const macros = [
    { macro: "Calories", amount: food.calories },
    { macro: "Protein", amount: food.protein },
    { macro: "Carbs", amount: food.carbs },
    { macro: "Fats", amount: food.fats },

  ];

  return (
    <Button
      variant="link"
      onPress={onPress}
      className={`w-fit h-fit my-2 p-2 justify-center border${quantity ? "" : "none"} border-outline-${quantity ? 100 : 0} bg-white rounded-xl`}
    >
      <VStack space="md" className="mx-2 w-full items-center">
        <Text bold size="xl" numberOfLines={1}>{food.name} {quantity && `(x${quantity})`}</Text>
        <HorizontalMacroView data={macros} />
        <FoodAllergenView data={allergens} />
        {/* allergen macro view */}

      </VStack>
    </Button>
  );
}