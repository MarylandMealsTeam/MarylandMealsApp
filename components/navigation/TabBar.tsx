import { View } from '../ui/view';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text } from '../ui/text';
import { Pressable } from "../ui/pressable";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { VStack } from '../ui/vstack';
import { Icon } from '../ui/icon';
import { Center } from '../ui/center';
import { HomeIcon, UserIcon, UtensilsIcon } from 'lucide-react-native';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    return (
        <View className="w-full pb-safe flex-row px-4 bg-slate-100 border-t border-outline-200">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const icon = options.title === "Profile" ? UserIcon : options.title === "Home" ? HomeIcon : UtensilsIcon;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={route.name}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <VStack className="m-auto">
                            <Center className="h-fit py-2">
                                <Icon
                                    as={icon}
                                    size="xl"
                                    className={`h-7 mb-1 aspect-square ${isFocused
                                        ? "text-primary-500"
                                        : "text-typography-400"
                                        }`}
                                />
                                <Text
                                    size="xs"
                                    className={`${isFocused ? "text-primary-500" : "text-typography-400"}`}
                                >
                                    {route.name[0].toUpperCase() + route.name.substring(1)}
                                </Text>
                            </Center>
                        </VStack>

                    </Pressable>
                );
            })}
        </View>
    );
}