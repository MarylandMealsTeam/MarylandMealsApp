import { router, useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import React, { useState } from "react";
import { log } from "@/api/logSession";
import Meal from "@/interfaces/Meal";
import { getMenuItem } from "@/api/menuSession";
import HorizontalMacroView from "@/components/widgets/HorizontalMacroView";
import NumberSpinner from "@/components/widgets/NumberSpinner";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { CheckIcon } from "lucide-react-native";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";

const FoodItemLayout = (props: any) => {
  return (
    <SafeAreaView className="w-full h-full bg-zinc-100">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="w-full p-5" space="md">
          {props.children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const Food = () => {
  const { id } = useLocalSearchParams();
  const item: Meal = getMenuItem(id as string);
  const [quantity, setQuantity] = useState(1);
  const food = item.menu_item;

  const list = [
    { macro: "Calories", amount: food.calories },
    { macro: "Carbs", amount: food.carbs },
    { macro: "Protein", amount: food.protein },
    { macro: "Fat", amount: food.fats }
  ];

  const Header = () => {
    return (
      <HStack className="items-center justify-between">
        <Pressable onPress={() => { router.back(); }} >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <Heading size="xl" numberOfLines={1} className="max-w-[80%]">{food.name}</Heading>
        <Pressable onPress={async () => { await log(item, quantity); router.back(); }} >
          <Icon
            as={CheckIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
      </HStack>
    );
  }

  const ServingSizeView = () => {
    return (
      <HStack className="w-full h-fit justify-between items-center px-4">
        <Text size="md">Serving Size:</Text>
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select serving size" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="1 cup" value="cup" />
              <SelectItem label="1 tbsp" value="tbsp" />
              <SelectItem label="1 oz" value="oz" />
              <SelectItem label="1 mg" value="mg" />
              <SelectItem label="1 g" value="g" />
              <SelectItem label="1 lb(s)" value="lbs" />
              <SelectItem label="1 kg" value="kg" />
              <SelectItem label="1 fluid oz" value="fluid-oz" />
              <SelectItem label="1 ml" value="ml" />
              <SelectItem label="1 liter" value="liter" />
              <SelectItem label="1 tsp(s)" value="tsps" />

            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
    );
  }

  return (
    <VStack space="4xl">
      <Header />
      <Card variant="elevated" className="rounded-md">
        <VStack space="md">
          <HorizontalMacroView data={list} />
          <Divider className="my-3"></Divider>
          <VStack space="md" className="px-0">
            <HStack className="w-full h-fit justify-between items-center px-4">
              <Text size="md">Quantity:</Text>
              <NumberSpinner value={quantity} setValue={setQuantity} />
            </HStack>
            <ServingSizeView />
            <Divider className="mt-3"></Divider>
          </VStack>
          <Accordion
            size="md"
            variant="unfilled"
            type="single"
            defaultValue={["a"]}
            className="m-auto w-full rounded-md"
          >
            <AccordionItem value="a">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionTitleText className="font-primary">View Ingredients</AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            className="ml-3"
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Text>{food.ingredients ?? "Sorry, no ingredients were found."}</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Card>
    </VStack>
  );
};

export default function FoodItem() {
  return (
    <FoodItemLayout>
      <Food />
    </FoodItemLayout>
  );
}
