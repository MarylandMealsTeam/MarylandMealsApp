import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { CircleHelpIcon, Edit2Icon, HeartIcon, MenuIcon, PlusIcon, TrashIcon } from "lucide-react-native";
import { View } from "@/components/ui/view";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist"
import { CloseIcon, Icon, createIcon } from "@/components/ui/icon";
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item'
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
    ActionsheetFlatList,
} from "@/components/ui/actionsheet"
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal"
import { ScrollView } from "@/components/ui/scroll-view";
import { Circle, Path } from "react-native-svg";
import { VStack } from "@/components/ui/vstack";
import { UserContext } from "../../../components/navigation/UserProvider";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { FlatList, ListRenderItem, ListRenderItemInfo, TouchableOpacity } from "react-native";
import { Allergen, allergens } from "@/types/Allergen";
import ReorderableList, {
    ReorderableListReorderEvent,
    reorderItems,
    useReorderableDrag,
} from 'react-native-reorderable-list';
import { Pressable } from "@/components/ui/pressable";
import AllergenView from "@/components/widgets/AllergenView";
import { update } from "@/api/updateSession";
import { DiningHallType } from "@/interfaces/User";


export default function Preferences() {
    const { user, setUser } = useContext(UserContext);
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";
    const [showModal, setShowModal] = useState(false);

    type Item = {
        key: string;
        label: string;
        height: number;
        width: number;
        backgroundColor: string;
    };

    // (NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList - backed container instead. [Component Stack]
    // When using NestableDraggableFlatLists, all React Native warnings about nested list performance will be disabled.
    const DiningHallsView = () => {
        const diningHalls = ["251 North", "Yahentamitsi", "South Campus"];
        const [diningOrder, setDiningOrder] = useState(user.diningHallPreferences);

        useEffect(() => {
            update({ diningHallPreferences: diningOrder });
        }, [diningOrder]);

        const Card = memo(({ item }: { item: DiningHallType }) => {
            const drag = useReorderableDrag();

            return (
                <Pressable onLongPress={drag}>
                    <HStack className="w-full justify-between items-center py-5 pl-1">
                        <Text>{diningOrder.indexOf(item) + 1}. {item}</Text>
                        <Icon
                            as={MenuIcon}
                            className="px-4 stroke-background-800"
                            size="xl"
                        />
                    </HStack>
                </Pressable>
            );
        });

        const renderItem = ({ item }: ListRenderItemInfo<DiningHallType>) => (<Card item={item} />);

        const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
            setDiningOrder((items: DiningHallType[]) => reorderItems(items, from, to));
        };

        return (
            <SectionView title="Dining Hall Preferences" icon={CircleHelpIcon} action={() => setShowModal(true)}>
                <Center className="w-full h-48">
                    <ReorderableList
                        data={diningOrder}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        scrollEnabled={false}
                        onReorder={handleReorder}
                    />
                </Center>
            </SectionView>
        );

    }

    const FoodView = () => {

        return (
            <SectionView title="Food Preferences" icon={Edit2Icon} action={() => { }}>
                <></>
            </SectionView>
        );

    }


    const AllergensView = () => {
        const t = user.allergens?.map((allergen: string) => allergens.find((a) => a.name === allergen)).filter((item): item is Allergen => item !== undefined) || [];
        const [userAllergens, setUserAllergens] = useState<Allergen[]>(t);
        const [showAllergens, setShowAllergens] = useState(false);

        const handleClose = () => setShowAllergens(false);

        useEffect(() => {
            update({ allergens: userAllergens.map((ua) => ua.name) });
        }, [userAllergens]);



        const UnderlayRight = ({ allergen }: { allergen: Allergen }) => {
            const { close } = useSwipeableItemParams<Allergen>();

            // needs to be fixed
            const deleteAllergen = () => {
                setUserAllergens(userAllergens.filter((ua) => ua.name !== allergen.name));
                close();
            }

            return (
                <View className="flex-1 bg-red-500 flex-row align-center h-fit justify-start text-center pr-5">
                    <Center className="w-[75px]">
                        <Button variant="link" className="w-full" onPress={deleteAllergen}>
                            <ButtonIcon as={TrashIcon} size="lg" className="text-white" />
                        </Button>
                    </Center>
                </View>
            );
        };

        const renderItem: ListRenderItem<Allergen> = useCallback(({ item: allergen }) => {
            return (
                <SwipeableItem
                    key={allergen.name}
                    item={allergen}
                    renderUnderlayRight={() => <UnderlayRight allergen={allergen} />}
                    snapPointsRight={[75]}
                >
                    <AllergenView size="md" className="bg-white py-2" {...allergen} />
                </SwipeableItem>
            );
        }, []);

        return (
            <>
                <SectionView title="Allergens" icon={PlusIcon} action={() => { setShowAllergens(true) }}>
                    <VStack className="w-full">
                        <FlatList
                            keyExtractor={(allergen) => allergen.name}
                            data={userAllergens}
                            renderItem={renderItem}
                            scrollEnabled={false}
                        />
                    </VStack>
                </SectionView>
                <Actionsheet isOpen={showAllergens} onClose={handleClose}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                            {allergens
                                .filter((allergen) => !userAllergens.some((ua) => ua.name === allergen.name))
                                .map((allergen) => {
                                    return (
                                        <ActionsheetItem className="pl-0 py-2" key={allergen.name} onPress={() => { setUserAllergens(userAllergens.concat(allergen)); handleClose(); }}>
                                            <AllergenView size="md" {...allergen} />
                                        </ActionsheetItem>
                                    );
                                })
                            }
                        </ScrollView>
                    </ActionsheetContent>
                </Actionsheet>
            </>
        );

    }


    return (
        <SettingsLayout data={[]} icon={HeartIcon} title="Preferences" description={preferencesDescription}>
            <DiningHallsView />
            <FoodView />
            <AllergensView />
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="md"
            >
                <ModalBackdrop />
                <ModalContent className="rounded-xl">
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Dining Hall Preferences
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text size="sm" className="text-typography-500">
                            Elevate your dining experience by customizing the order of dining halls in your preferences. This ranking directly determines which meal suggestions appear first in your recommendations, with options from your top-ranked halls receiving priority placement. By ordering halls according to your preferences, Maryland Meals optimizes your feed to show the most relevant options from your favorite locations first.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="rounded-lg" onPress={() => setShowModal(false)}>
                            <ButtonText>OK</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </SettingsLayout>
    );
}