import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import Link from "@unitools/link";
import { router } from "expo-router";
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
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import AuthLayout from "../../components/layouts/AuthLayout";
import { register } from "@/api/authenticateSession";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { GoogleIcon } from "@/assets/icons/google";

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmpassword: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpView = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
      return !showState;
    });
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: SignUpSchemaType) => {
    if (data.password === data.confirmpassword) {
      const userCreated = register("first last", data.email, data.password);

      if (userCreated) {
        toast.show({
          placement: "bottom right",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} variant="solid" action="success">
                <ToastTitle>Successfully created your account!</ToastTitle>
              </Toast>
            );
          },

        });
        reset();
        router.replace("/auth/login");
      } else {
        toast.show({
          placement: "bottom right",
          render: ({ id }) => {
            return (
              <Toast nativeID={id} variant="solid" action="error">
                <ToastTitle>Unable to create your account</ToastTitle>
              </Toast>
            );
          },
        });
      }
    } else {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };


  return (
    <VStack className="w-full h-fit" space="md">
      <VStack className="w-full max-w-[440px] mx-auto h-fit">
        <VStack space="xl" className="w-full">
          <VStack space="4xl">
            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await signUpSchema.parseAsync({ email: value });
                      return true;
                    } catch (error: any) {
                      return error.message;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="rounded-lg bg-white">
                    <InputField
                      placeholder="Email"
                      type="text"
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
                <FormControlErrorIcon size="md" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
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
                      await signUpSchema.parseAsync({
                        password: value,
                      });
                      return true;
                    } catch (error: any) {
                      return error.message;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="rounded-lg bg-white">
                    <InputField
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                      type={showPassword ? "text" : "password"}
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
                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmpassword}>
              <FormControlLabel>
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=""
                name="confirmpassword"
                control={control}
                rules={{
                  validate: async (value) => {
                    try {
                      await signUpSchema.parseAsync({
                        password: value,
                      });
                      return true;
                    } catch (error: any) {
                      return error.message;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="rounded-lg bg-white">
                    <InputField
                      placeholder="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                      type={showConfirmPassword ? "text" : "password"}
                      selectionColor="#E11932"
                      className="text-md"
                    />

                    <InputSlot onPress={handleConfirmPwState} className="pr-3">
                      <InputIcon
                        as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.confirmpassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        </VStack>

        <VStack className="w-full my-10" space="lg">
          <Button className="w-full rounded-lg" onPress={handleSubmit(onSubmit)}>
            <ButtonText className="font-medium">Sign up</ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full bg-white rounded-lg"
          // onPress={loginWithGoogle}
          >
            <ButtonIcon as={GoogleIcon} />
            <ButtonText className="font-medium">
              Sign up with Google
            </ButtonText>
          </Button>
        </VStack>
        <HStack className="self-center pb-5" space="sm">
          <Text size="md">Already have an account?</Text>
          <Button variant="link" className="h-6" onPress={() => router.replace("/auth/login")}>
            <ButtonText>Log in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default function Signup() {
  return (
    <AuthLayout title="Sign up">
      <SignUpView />
    </AuthLayout>
  );
}
