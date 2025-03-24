import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
    CheckboxGroup,
} from "@/components/ui/checkbox"
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
} from "@/components/ui/form-control"
import { VStack } from "@/components/ui/vstack"
import { CheckIcon } from "@/components/ui/icon"
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { HStack } from "../ui/hstack"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { FilterIcon, HelpCircleIcon } from "lucide-react-native"
import HelpButton from "./HelpButton"
import { ScrollView } from "react-native"
import { Meal } from "@/interfaces/Meal"
import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from "@/components/ui/actionsheet"
import { allergens } from "@/types/Allergen"
import { FilterContext } from "@/app/(tabs)/menu"




const CheckboxFilterView = ({ title, options, values, setValues }: { title: string, options: string[], values: string[], setValues: any }) => {

    return (
        <VStack>
            <FormControlLabel>
                <FormControlLabelText>{title}</FormControlLabelText>
            </FormControlLabel>
            <CheckboxGroup
                className="my-2"
                value={values}
                onChange={(keys) => {
                    setValues(keys)
                }}
            >
                <VStack space="sm">
                    {options.map((option, index) => {
                        return (
                            <Checkbox key={index} size="sm" value={option}>
                                <CheckboxIndicator className="mr-2">
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                                <CheckboxLabel>{option}</CheckboxLabel>
                            </Checkbox>
                        );
                    })}
                </VStack>
            </CheckboxGroup>
            <FormControlHelper>
                <FormControlHelperText>
                    Select which dining halls you'd like to view meals from
                </FormControlHelperText>
            </FormControlHelper>
        </VStack>
    );
}


export default function FilterView() {

    const diningHalls = ["Yahentamitsi", "South Campus", "251 North"];
    const [selectedDiningHalls, setSelectedDiningHalls] = useState(diningHalls);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const [showActionsheet, setShowActionsheet] = useState(false);
    const handleClose = () => setShowActionsheet(false);

    const { setDiningHalls, setAllergens } = useContext(FilterContext);

    const clearFilters = () => {
        setSelectedDiningHalls([]);
        setSelectedAllergens([]);
    }

    const updatePreferences = () => {

    }

    const resetFilters = () => {

    }

    useEffect(() => {
        setDiningHalls(selectedDiningHalls);
        setAllergens(selectedAllergens);
        console.log("CHANGED" + selectedDiningHalls)
    }, [selectedDiningHalls, selectedAllergens]);

    return (
        <>
            <Button variant="link" size="md" className="rounded-md" onPress={() => setShowActionsheet(true)}>
                <ButtonIcon as={FilterIcon} className="text-primary-500" />
            </Button>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <FormControl className="w-full h-fit px-5 pt-5">
                        <HelpButton title="Select Filters" message="Filter menu items by selecting specific dining halls or excluding meals with certain allergens to customize your dining experience. Update Preferences saves your filter selections to your profile as defaults across the app, Reset Filters reverts to your saved profile preferences, and Clear Filters removes all active filters from the Menu page to display all available meals at once, helping you find options that match your dietary needs quickly and efficiently." className="h-fit z-10 absolute right-5 top-5" />
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-safe" className="w-full h-fit z-0">
                            <VStack space="4xl">
                                <CheckboxFilterView title="Dining Halls" options={diningHalls} values={selectedDiningHalls} setValues={setSelectedDiningHalls} />
                                <CheckboxFilterView title="Allergens" options={allergens.map((allergen) => allergen.name)} values={selectedAllergens} setValues={setSelectedAllergens} />
                            </VStack>
                            <VStack space="md" className="mt-5">
                                <Button isDisabled className="rounded-lg" onPress={updatePreferences}>
                                    <ButtonText>Update Preferences</ButtonText>
                                </Button>
                                <Button className="rounded-lg" onPress={resetFilters}>
                                    <ButtonText>Reset Filters</ButtonText>
                                </Button>
                                <Button className="rounded-lg" onPress={clearFilters}>
                                    <ButtonText>Clear Filters</ButtonText>
                                </Button>
                            </VStack>
                        </ScrollView>
                    </FormControl>
                </ActionsheetContent>
            </Actionsheet>
        </>
    );
}