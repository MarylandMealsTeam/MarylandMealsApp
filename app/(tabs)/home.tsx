import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Calendar from "@/components/Calendar";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import React from "react";
import MacroCard from "@/components/MacroCard";
import { VStack } from "@/components/ui/vstack";
import FoodCard from "@/components/FoodCard";
import { getFoodLog } from "@/api/userSession";
import FoodLogDocument from "@/models/FoodLogDocument";
import { FoodDocument } from "@/models/FoodDocument";
import { Grid, GridItem } from "@/components/ui/grid";
import { SafeAreaView } from "react-native";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import ContentLayout from "../contentLayout";


const userData = [
  { macro: "Calories", amount: 25 },
  { macro: "Carbs", amount: 50 },
  { macro: "Protein", amount: 75 },
  { macro: "Fat", amount: 100 }
];

export default function Dashboard() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [log, setLog] = useState<(FoodDocument | undefined)[]>([]);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  useEffect(() => { getFoodLog(date).then((log) => setLog(log)) }, [date]);

  const MacroProgressView = () => {
    return (
      <Grid className="gap-y-2 gap-x-2" _extra={{ className: "grid-cols-2"}}>
        {
          userData.map((entry, index) => {
            return (
              <GridItem _extra={{ className: "col-span-1" }} key={index}>
                <MacroCard {...entry} />
              </GridItem>
            );
          })
        }
      </Grid>
    );
  }

  const LogView = () => {
    return (
      <Accordion
        size="md"
        variant="unfilled"
        type="single"
        defaultValue={["a"]}
        className="m-5 w-full border border-outline-200"
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>Meals Logged</AccordionTitleText>
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
            {log?.map((item) => <FoodCard {...item!} />)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  const PlanView = () => {
    return (
      <Accordion
        size="md"
        variant="unfilled"
        type="single"
        defaultValue={["a"]}
        className="m-5 w-full border border-outline-200"
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>Meal Plan</AccordionTitleText>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <ContentLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <VStack className="md:px-10 md:pt-6 w-full px-5" space="2xl">
          {/* font-roboto not working with ios */}
          <HStack className="w-full items-center justify-between">
            <Heading size="3xl" className="font-roboto">
              {date.toLocaleDateString("en-us", options)}
            </Heading>
            <Calendar date={date} setDate={setDate} placement="bottom" />
          </HStack>
          <VStack>
            <MacroProgressView />
            <Center>
              <LogView />
              <PlanView />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
};