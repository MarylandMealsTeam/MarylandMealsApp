import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "../ui/pressable";
import { Icon } from "../ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";
import { Heading } from "../ui/heading";
import { router } from "expo-router";

export default function AuthLayout(props: any) {
    return (
        <SafeAreaView className="w-full h-full">
            <ScrollView
                className="w-full h-full bg-zinc-100"
                contentContainerClassName="flex-grow pb-safe"
            >
                <VStack className="items-center justify-center h-full w-full px-9">
                    <HStack className="items-center justify-between w-full px-5 absolute top-5">
                        <Pressable onPress={() => { router.back(); }} >
                            <Icon
                                as={ArrowLeftIcon}
                                className="stroke-background-800"
                                size="xl"
                            />
                        </Pressable>
                        <Heading size="xl" numberOfLines={1}>{props.title}</Heading>
                        <Icon
                            as={undefined}
                            size="xl"
                        />
                    </HStack>
                    <VStack className="w-full max-w-[440px] mx-auto h-fit">
                        <VStack className="items-center justify-center my-20" space="md">
                            <Image
                                size="xl"
                                source={require("../../assets/images/MarylandMeal.png")}
                                alt="MarylandMeals"
                                className="rounded-3xl"
                            />
                            <Heading size="3xl" numberOfLines={1} className="text-primary-500">MarylandMeals</Heading>
                        </VStack>
                        {props.children}
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
};