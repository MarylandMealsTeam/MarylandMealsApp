import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { BellIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors"
import { VStack } from "@/components/ui/vstack";
import { useContext } from "react";
import { UserContext } from "../../../components/navigation/UserProvider";

export default function Notifications() {
    const { user, setUser } = useContext(UserContext);
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";

    const color = { false: colors.gray[300], true: "#E11932" };

    // (NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList - backed container instead. [Component Stack]
    // When using NestableDraggableFlatLists, all React Native warnings about nested list performance will be disabled.
    const AlertsView = () => {
        return (
            <SectionView title="Alerts">
                <Center className="w-full h-fit mt-2">
                    <VStack space="lg" className="w-full">
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="md">Allow suggestions</Text>
                            <Switch trackColor={color} />
                        </HStack>
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="md">Alerts on when to eat</Text>
                            <Switch trackColor={color} />
                        </HStack>
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="md">Alert when new meal plan is created</Text>
                            <Switch trackColor={color} />
                        </HStack>
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="md">Alert streak is about to be lost</Text>
                            <Switch trackColor={color} />
                        </HStack>
                    </VStack>
                </Center>
            </SectionView>
        );

    }


    return (
        <SettingsLayout data={[]} icon={BellIcon} title="Notifications" description={preferencesDescription}>
            <AlertsView />
        </SettingsLayout>
    );
}