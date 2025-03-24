import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import { View } from "../ui/view";
import Meal from "@/interfaces/Meal";
import FoodCard from "../cards/FoodCard";

export interface MealPlanData {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}

export default function MealPlan({
  title,
  content,
}: {
  title: string;
  content: MealPlanData;
}) {
  console.log(content);
  const mealPlan: MealPlanData =
    typeof content === "string" ? JSON.parse(content) : content;

  const renderMealList = (meal?: Meal[]) => (
    <View>
      {meal?.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </View>
  );

  return (
    <Accordion
      size="md"
      variant="unfilled"
      type="single"
      defaultValue={["a"]}
      className="my-2 w-full rounded-xl border border-outline-0 bg-white"
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText className="font-primary">
                    {title}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Heading className="text-primary-700 text-center">Breakfast</Heading>
          {renderMealList(mealPlan.breakfast)}
          <Heading className="text-primary-700 text-center">Lunch</Heading>
          {renderMealList(mealPlan.lunch)}
          <Heading className="text-primary-700 text-center">Dinner</Heading>
          {renderMealList(mealPlan.dinner)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
