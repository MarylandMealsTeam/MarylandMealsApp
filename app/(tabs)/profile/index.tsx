import React, { createContext, useContext, useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
  EditIcon,
  PhoneIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import EditProfile from "@/components/widgets/EditProfile";
import SettingsCard from "@/components/cards/SettingsCard";
import User from "@/interfaces/User";
import { router } from "expo-router";
import ContentLayout from "@/components/layouts/ContentLayout";
import { View } from "@/components/ui/view";
import HorizontalMacroView from "@/components/widgets/HorizontalMacroView";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";
import { BellIcon, ChevronRightIcon, GlobeIcon, GoalIcon, HeartIcon, LogOutIcon, PersonStandingIcon, StarIcon, UserPenIcon } from "lucide-react-native";
import { Card } from "@/components/ui/card";
import { getUser, logout } from "@/api/userSession";
import { UserContext } from "../../../components/navigation/UserProvider";
import { useIsFocused } from "@react-navigation/native";



const ProfileView = () => {
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <Center className="w-full">
      <Card variant="elevated" className="w-full rounded-xl">
        <EditProfile showModal={showModal} setShowModal={setShowModal} />
        <VStack space="lg" className="items-center">
          <Avatar size="2xl" className="bg-primary-500">
            <AvatarImage
              alt="Profile Image"
              height={100}
              width={100}
              source={require("@/assets/images/TerrapinLogo.png")}
              className="p-3"
            />
          </Avatar>
          <VStack className="gap-1 w-full items-center">
            <Text size="2xl" className="font-roboto text-center text-dark">
              {user?.name}
            </Text>
            <Text className="font-roboto text-center text-sm text-typography-700">
              {user?.email}
            </Text>
            <Text className="font-roboto text-center text-sm text-typography-700">
              Streaks: -1
            </Text>
          </VStack>
        </VStack>
      </Card>
    </Center>
  );
}

const AccountSettingsView = () => {
  return (
    <VStack className="" space="2xl">
      <Heading className="font-roboto" size="xl">
        Account
      </Heading>
      <VStack className="py-2 px-4 rounded-xl justify-between items-center bg-white">
        <SettingsCard key={1} icon={UserPenIcon} subText={"Edit Profile"} />
        <SettingsCard key={2} icon={GoalIcon} subText={"Goals"} />
        <SettingsCard key={3} icon={HeartIcon} subText={"Preferences"} />
        <SettingsCard key={4} icon={BellIcon} subText={"Notifications"} isLast={true} />
      </VStack>
    </VStack>
  );
}

// use useContext to make everything faster and instead of passing user to all the views!
export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const isFocused = useIsFocused();
  useEffect(() => { getUser().then((user) => { setUser(user); }) }, [isFocused]);

  return (
    <ContentLayout data={user._id}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-fit w-full"
      >
        <VStack className="h-full w-full mb-16 px-5" space="2xl">
          <HStack className="w-full justify-between items-center">
            <Heading size="3xl" className="text-primary-500">Hi, {user.name}</Heading>
            <Button
              variant="link"
              action="primary"
              className="gap-3 relative rounded-lg"
              onPress={async () => { await logout(); router.replace("/auth"); }}
            >
              <ButtonIcon as={LogOutIcon} className="text-primary-500" />
            </Button>
          </HStack>
          <ProfileView />
          <AccountSettingsView />
        </VStack>
      </ScrollView>
    </ContentLayout>
  );


};
