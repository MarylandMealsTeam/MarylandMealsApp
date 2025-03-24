import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React from "react";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "../ui/pressable";
import { Href, router } from "expo-router";
import { ChevronRightIcon, LucideIcon } from "lucide-react-native";

export default function SettingsCard({ icon, subText, isLast }: { icon: LucideIcon | typeof Icon, subText: string, isLast?: boolean }) {
    return (
        <>
            <Pressable className="h-fit w-full" onPress={() => router.navigate(("/(tabs)/profile/" + subText.toLowerCase().replace(" ", "_")) as Href)}>
                <HStack
                    space="2xl"
                    className="justify-between items-center w-full h-fit py-3 px-2"
                >
                    <HStack className="items-center" space="md">
                        <Icon as={icon} className="stroke-[#747474]" />
                        <Text size="lg">{subText}</Text>
                    </HStack>
                    <Icon as={ChevronRightIcon} className="stroke-primary-100" />
                </HStack>
            </Pressable>
            {!isLast && <Divider className="my-1" />}
        </>
    );
}