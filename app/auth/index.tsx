import { useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";

const SplashScreen = () => {
  const router = useRouter();

  return (
    <VStack
      className="w-full max-w-[440px] items-center h-fit my-auto justify-center"
      space="4xl"
    >
      <HStack className="w-fit" space="md">
        <Image
          size="sm"
          source={require("../../assets/images/MarylandMeal.png")}
          alt="MarylandMeals"
          className="rounded-xl"
        />
        <Center>
          <Heading bold size="3xl" className="text-primary-500">
            MarylandMeals
          </Heading>
        </Center>
      </HStack>
      <VStack className="w-full h-14 mt-10" space="lg">
        <Button className="w-full h-full rounded-lg" onPress={() => router.navigate("/auth/login")}>
          <ButtonText size="lg" className="font-medium">Login</ButtonText>
        </Button>
        <Button className="w-full h-full rounded-lg" onPress={() => router.navigate("/auth/signup")}>
          <ButtonText size="lg" className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export default function Index() {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full bg-zinc-100"
        contentContainerClassName="flex-grow pb-safe"
      >
        <VStack className="items-center justify-center h-full w-full px-9">
          <SplashScreen />
        </VStack>
        {/* for web view/landscape only! */}
        {/* <HStack className="w-full h-full justify-center">
                        <VStack
                            className="relative md:hidden h-full w-full flex-1 items-center justify-center"
                            space="md"
                        >
                            <Image
                                height={100}
                                width={100}
                                source={require("@/assets/images/MarylandMeal.png")}
                                className="object-cover h-full w-full"
                                alt="MarylandMeals"
                            />
                        </VStack>
                    </HStack> */}
      </ScrollView>
    </SafeAreaView>
  );
}
