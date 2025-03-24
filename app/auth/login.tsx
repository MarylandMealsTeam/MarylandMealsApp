import React, { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link, LinkText } from "@/components/ui/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { router, useRouter } from "expo-router";
import AuthLayout from "../../components/layouts/AuthLayout";
import { login } from "@/api/authenticateSession";
import { Image } from "@/components/ui/image";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleIcon } from "@/assets/icons/google";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

GoogleSignin.configure({
  webClientId: '43338451273-0hf3g37j0co0sbdfp322oi4flrbq9ni6.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '43338451273-ua51jdq1juhcus1nlpckjoqcan2imn87.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const LoginView = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: LoginSchemaType) => {
    const user = await login(data.email, data.password);

    if (user) {
      setValidated({ emailValid: true, passwordValid: true });
      router.replace("/(tabs)/home");
    } else {
      setValidated({ emailValid: false, passwordValid: false });
    }
  };

  const loginWithGoogle = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        console.log(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened

        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };




  return (
    <VStack className="w-full h-fit" space="md">
      <VStack space="xl" className="w-full">
        <FormControl
          isInvalid={!!errors?.email || !validated.emailValid}
          className="w-full"
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await loginSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-lg bg-white">
                <InputField
                  placeholder="Enter email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  selectionColor="#E11932"
                  className="text-md"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message ||
                (!validated.emailValid && "Email ID not found")}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        {/* Label Message */}
        <FormControl
          isInvalid={!!errors.password || !validated.passwordValid}
          className="w-full"
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await loginSchema.parseAsync({ password: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="rounded-lg bg-white">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  selectionColor="#E11932"
                  className="text-md"
                />
                <InputSlot onPress={handleState} className="pr-3">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message ||
                (!validated.passwordValid && "Password was incorrect")}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <HStack className="w-full justify-between ">
          <Controller
            name="rememberme"
            defaultValue={false}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                size="sm"
                value="Remember me"
                isChecked={value}
                onChange={onChange}
                aria-label="Remember me"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Remember me</CheckboxLabel>
              </Checkbox>
            )}
          />
        </HStack>
      </VStack>
      <VStack className="w-full my-10" space="lg">
        <Button className="w-full rounded-lg" onPress={handleSubmit(onSubmit)}>
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button
          variant="outline"
          action="secondary"
          className="w-full bg-white rounded-lg"
          onPress={loginWithGoogle}
        >
          <ButtonIcon as={GoogleIcon} />
          <ButtonText className="font-medium">
            Login with Google
          </ButtonText>
        </Button>
      </VStack>
      <HStack className="self-center pb-5" space="sm">
        <Text size="md">Don't have an account?</Text>
        <Button variant="link" className="h-6" onPress={() => router.replace("/auth/signup")}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

export default function Login() {
  return (
    <AuthLayout title="Login">
      <LoginView />
    </AuthLayout>
  );
}
