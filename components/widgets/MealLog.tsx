import Meal from "@/interfaces/Meal";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "../ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import React from "react";
import FoodCard from "../cards/FoodCard";

export default function MealLog({ title, log }: { title: string, log?: { item: Meal, quantity: number }[] }) {
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
                                    <AccordionTitleText className="font-primary">{title}</AccordionTitleText>
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
                    {log?.map((entry, index) => <FoodCard {...entry} key={index} />)}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}