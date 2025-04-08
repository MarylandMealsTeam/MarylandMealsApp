import { useEffect, useState, useContext } from "react";
import Calendar from "@/components/widgets/Calendar";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { getFoodLog, getMacros } from "@/api/logSession";
import { Grid, GridItem } from "@/components/ui/grid";
import { Text } from "@/components/ui/text";
import ContentLayout from "@/components/layouts/ContentLayout";
import { useIsFocused } from "@react-navigation/native";
import MealLog from "@/components/widgets/MealLog";
import Macros from "@/interfaces/Macros";
import Meal from "@/interfaces/Meal";
import { Card } from "@/components/ui/card";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import MealPlan from "@/components/widgets/MealPlan";
import { getMealPlan } from "@/api/aiSession";
import { MealPlanData } from "@/components/widgets/MealPlan";

const MacroProgressView = ({
  target,
  consumed,
}: {
  target: Macros;
  consumed: Macros;
}) => {
  const macros = [
    { name: "Calories", target: target.calories, consumed: consumed.calories },
    { name: "Protein", target: target.protein, consumed: consumed.protein },
    { name: "Carbs", target: target.carbs, consumed: consumed.carbs },
    { name: "Fats", target: target.fats, consumed: consumed.fats },
  ];

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2,
  };

  return (
    <Card variant="elevated" className="h-60 rounded-xl">
      <HStack space="lg" className="w-full m-auto justify-between">
        <Center className="w-[40%] pl-2">
          <CircularProgressBase
            {...props}
            value={consumed.calories > target.calories ? target.calories : consumed.calories}
            maxValue={target.calories}
            radius={80}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            activeStrokeColor={"#e84118"}
            inActiveStrokeColor={"#e84118"}
          >
            <CircularProgressBase
              {...props}
              value={consumed.protein > target.protein ? target.protein : consumed.protein}
              maxValue={target.protein}
              radius={67.5}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              activeStrokeColor={"#badc58"}
              inActiveStrokeColor={"#badc58"}
            >
              <CircularProgressBase
                {...props}
                value={consumed.carbs > target.carbs ? target.carbs : consumed.carbs}
                maxValue={target.carbs}
                radius={55}
                activeStrokeWidth={15}
                inActiveStrokeWidth={15}
                activeStrokeColor={"#18dcff"}
                inActiveStrokeColor={"#18dcff"}
              >
                <CircularProgressBase
                  {...props}
                  value={consumed.fats > target.fats ? target.fats : consumed.fats}
                  maxValue={target.fats}
                  radius={42.5}
                  activeStrokeWidth={15}
                  inActiveStrokeWidth={15}
                  activeStrokeColor={"#ffA500"}
                  inActiveStrokeColor={"#ffA500"}
                />
              </CircularProgressBase>
            </CircularProgressBase>
          </CircularProgressBase>
        </Center>
        <VStack className="w-[60%] h-full">
          <Grid
            className="gap-y-6 gap-x-0 m-auto"
            _extra={{ className: "grid-cols-2" }}
          >
            {macros.map((macro, index) => {
              return (
                <GridItem
                  _extra={{ className: "col-span-1" }}
                  key={index}
                  className=""
                >
                  <VStack className="items-center">
                    <Text size="lg" bold>
                      {macro.name} ({macro.name === "Calories" ? "kcal" : "g"})
                    </Text>
                    <Text size="xl">
                      {macro.consumed.toFixed()}/{macro.target.toFixed()}
                    </Text>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
      </HStack>
    </Card>
  );
};

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [log, setLog] = useState<{ item: Meal; quantity: number }[]>();
  const [macros, setMacros] = useState<{
    target: Macros;
    consumed: Macros;
  } | null>();
  const isFocused = useIsFocused();
  const [mealPlan, setMealPlan] = useState<MealPlanData>();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  useEffect(() => {
    getFoodLog(date).then((log) => setLog(log));
  }, [date, isFocused]);
  useEffect(() => {
    getMacros(date).then((macros) => setMacros(macros));
  }, [date, log, isFocused]);
  useEffect(() => {
    getMealPlan().then((mealPlan) => setMealPlan(mealPlan));
  }, [isFocused]);

  return (
    // need to change data placeholder!
    <ContentLayout data={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="w-full px-5" space="2xl">
          <HStack className="w-full items-center justify-start" >
            <Calendar date={date} setDate={setDate} placement="bottom" />
          </HStack>
          <VStack>
            {/* needs to be fixed! - if macro exceeds the target then it glitches! also animation is glitchy!*/}
            {macros && (
              <MacroProgressView
                target={macros.target}
                consumed={macros.consumed}
              />
            )}
            <VStack className="mt-10">
              <MealLog title={"Meals logged"} log={log} />
              <MealPlan title={"Meal plan"} mealPlan={mealPlan} />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
}
