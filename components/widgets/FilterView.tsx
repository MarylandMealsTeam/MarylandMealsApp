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
import { allergens } from "@/interfaces/Allergen"
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
                    {options.map((option) => {
                        return (
                            <Checkbox size="sm" value={option}>
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
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} snapPoints={[50]}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <FormControl className="w-full h-full p-5 pb-safe">
                        <ScrollView showsVerticalScrollIndicator={false} className="w-full h-full z-0">
                            <HelpButton title="Filters" message="lorem" className="h-fit z-10 absolute right-0 top-0" />
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