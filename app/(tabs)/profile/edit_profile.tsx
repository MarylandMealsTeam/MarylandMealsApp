import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { CheckIcon, ChevronDownIcon, UserPenIcon } from "lucide-react-native";
import { useContext, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Input, InputField } from "@/components/ui/input";
import { UserContext } from "../../../components/navigation/UserProvider";
import Calendar from "@/components/widgets/Calendar";
import { update } from "@/api/updateSession";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectScrollView, SelectItem } from "@/components/ui/select";
import { SexType } from "@/interfaces/User";


export default function EditProfile() {
    const { user } = useContext(UserContext);
    const goalsDescription = "Set and customize weight and macro goals for your fitness journey.";

    const NamesView = () => {
        const [firstName, setFirstName] = useState(user.name.split(" ")[0]);
        const [lastName, setLastName] = useState(user.name.split(" ")[1]);

        return (
            <SectionView title="Edit Name" icon={CheckIcon} action={() => { update({ name: firstName + " " + lastName }); }}>
                <Center className="w-full h-fit">
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>First Name:</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            className="w-1/2 border-0"
                        >
                            <InputField
                                value={firstName}
                                placeholder="Enter your first name..."
                                onChangeText={(text) => setFirstName(text)}
                                selectionColor="#E11932"

                            />
                        </Input>
                    </HStack>
                    <Divider />
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>Last Name:</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            className="w-1/2 border-0"
                        >
                            <InputField
                                value={lastName}
                                placeholder="Enter your last name..."
                                onChangeText={(text) => setLastName(text)}
                                selectionColor="#E11932"
                            />
                        </Input>
                    </HStack>
                </Center>
            </SectionView>
        );

    }

    const DateOfBirthView = () => {
        const [date, setDate] = useState(new Date(user.dateOfBirth));

        return (
            <SectionView title="Edit Date of Birth" icon={CheckIcon} action={() => { update({ dateOfBirth: date }); }}>
                <Center className="w-full h-fit">
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>Date of Birth:</Text>
                        <Calendar date={date} setDate={setDate} placement="top" size="sm" />
                    </HStack>
                </Center>
            </SectionView>
        );
    }

    const HeightView = () => {
        const heights = Array.from({ length: 96 }, (_, i) => (i + 1));
        const height = user.height;

        const displayHeight = (height: number) => {
            if (height < 12) {
                return height + " in";
            } else {
                const feet = Math.floor(height / 12);
                const inches = height % 12;
                return feet + " ft " + inches + " in";
            }
        }

        return (
            <SectionView title="Edit Height">
                <Center className="w-full h-fit">
                    <HStack className="w-full py-1 items-center">
                        <Text>Height: </Text>
                        <Select onValueChange={(height) => update({ height: parseInt(height) })}>
                            <SelectTrigger variant="outline" size="md" className="border-0">
                                <SelectInput placeholder={displayHeight(height)} className="text-primary-500" />
                                <SelectIcon className="mr-1" as={ChevronDownIcon} />
                            </SelectTrigger>
                            <SelectPortal snapPoints={[50]}>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectScrollView>
                                        {heights.map((ht, index) => <SelectItem label={displayHeight(ht)} value={ht.toString()} key={index} />)}
                                    </SelectScrollView>
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </HStack>
                </Center>
            </SectionView>
        );
    }

    const SexView = () => {
        const sex = user.sex;

        return (
            <SectionView title="Edit Sex">
                <Center className="w-full h-fit">
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>Sex:</Text>
                        <Select onValueChange={(sex) => update({ sex: sex as SexType })}>
                            <SelectTrigger variant="outline" size="md" className="border-0">
                                <SelectInput placeholder={sex[0].toUpperCase() + sex.substring(1)} className="text-primary-500" />
                                <SelectIcon className="mr-1" as={ChevronDownIcon} />
                            </SelectTrigger>
                            <SelectPortal snapPoints={[15]}>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectScrollView>
                                        <SelectItem label={"Male"} value={"male"} />
                                        <SelectItem label={"Female"} value={"female"} />
                                    </SelectScrollView>
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </HStack>
                </Center>
            </SectionView>
        );

    }

    // ui bugs when loading isn't instantaneous
    return (
        <SettingsLayout data={{}} icon={UserPenIcon} title={"Edit Profile"} description={goalsDescription}>
            {/* <WeightGoalsView />
            <MacroGoals /> */}
            <NamesView />
            <HeightView />
            <SexView />
            <DateOfBirthView />
        </SettingsLayout>
    );
}