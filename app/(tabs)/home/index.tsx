import { useEffect, useState } from "react";
import Calendar from "@/components/widgets/Calendar";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
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
import { Meal } from "@/interfaces/Meal";
import { Card } from "@/components/ui/card";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { Divider } from "@/components/ui/divider";
import { ChevronDownIcon } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";


const MacroProgressView = ({ target, consumed }: { target: Macros, consumed: Macros }) => {
  const macros = [
    { name: "Calories", target: target.calories, consumed: consumed.calories },
    { name: "Protein", target: target.protein, consumed: consumed.protein },
    { name: "Carbs", target: target.carbs, consumed: consumed.carbs },
    { name: "Fats", target: target.fats, consumed: consumed.fats }
  ];

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  return (
    // <Grid className="gap-y-2 gap-x-2 bg-white rounded-xl" _extra={{ className: "grid-cols-2" }}>
    //   {
    //     macros.map((entry, index) => {
    //       return (
    //         <GridItem _extra={{ className: "col-span-1" }} key={index}>
    //           <MacroCard {...entry} />
    //         </GridItem>
    //       );
    //     })
    //   }
    // </Grid>
    <Card variant="elevated" className="h-60 rounded-xl">
      <HStack space="lg" className="w-fit m-auto">
        <Center className="w-[40%] pl-2">
          <CircularProgressBase
            {...props}
            value={consumed.calories}
            maxValue={target.calories}
            radius={80}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            activeStrokeColor={'#e84118'}
            inActiveStrokeColor={'#e84118'}
          >
            <CircularProgressBase
              {...props}
              value={consumed.protein}
              maxValue={target.protein}
              radius={67.5}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              activeStrokeColor={'#badc58'}
              inActiveStrokeColor={'#badc58'}
            >
              <CircularProgressBase
                {...props}
                value={consumed.carbs}
                maxValue={target.carbs}
                radius={55}
                activeStrokeWidth={15}
                inActiveStrokeWidth={15}
                activeStrokeColor={'#18dcff'}
                inActiveStrokeColor={'#18dcff'}
              >
                <CircularProgressBase
                  {...props}
                  value={consumed.fats}
                  maxValue={target.fats}
                  radius={42.5}
                  activeStrokeWidth={15}
                  inActiveStrokeWidth={15}
                  activeStrokeColor={'#ffA500'}
                  inActiveStrokeColor={'#ffA500'}
                />
              </CircularProgressBase>
            </CircularProgressBase>
          </CircularProgressBase>
        </Center>
        <VStack className="w-[60%] h-full">
          <Grid className="gap-y-6 gap-x-0 m-auto" _extra={{ className: "grid-cols-2" }}>
            {
              macros.map((macro, index) => {
                return (
                  <GridItem _extra={{ className: "col-span-1" }} key={index} className="">
                    <VStack className="items-center">
                      <Text size="lg" bold>{macro.name} ({macro.name === "Calories" ? "kcal" : "g"})</Text>
                      <Text size="xl">{macro.consumed.toFixed()}/{macro.target.toFixed()}</Text>
                    </VStack>
                  </GridItem>
                );
              })
            }
          </Grid>
        </VStack>
      </HStack>
    </Card>
  );
}


export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [log, setLog] = useState<{ item: Meal, quantity: number }[]>();
  const [macros, setMacros] = useState<{ target: Macros; consumed: Macros; } | null>();
  const isFocused = useIsFocused();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  useEffect(() => { getFoodLog(date).then((log) => setLog(log)) }, [date, isFocused]);
  useEffect(() => { getMacros(date).then((macros) => setMacros(macros)) }, [date, log]);



  return (
    // need to change data placeholder!
    <ContentLayout data={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <VStack className="w-full px-5" space="2xl">
          <HStack className="w-full items-center justify-start" >
            <Calendar date={date} setDate={setDate} placement="bottom">
              <Heading size="3xl" className="text-primary-500">
                {date.toLocaleDateString("en-us", options)}
              </Heading>
              <Icon as={ChevronDownIcon} className="text-primary-500 aspect-square w-8"></Icon>
            </Calendar>
          </HStack>
          <VStack>
            {/* needs to be fixed! - if macro exceeds the target then it glitches! also animation is glitchy!*/}
            {macros && <MacroProgressView target={macros.target} consumed={macros.consumed} />}
            <VStack className="mt-10">
              <MealLog title={"Meals logged"} log={log} />
              <MealLog title={"Meal Plan"} log={[]} />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
};