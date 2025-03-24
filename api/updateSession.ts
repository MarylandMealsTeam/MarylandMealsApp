import { Allergen } from "@/types/Allergen";
import session from "./userSession";
import Macros from "@/interfaces/Macros";
import User from "@/interfaces/User";
import { AxiosError } from "axios";

export async function update(updatedUser: Partial<User>) {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL!,
      updatedUser
    );

    console.log("Successfully updated user!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function generateMacros() {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL +
        process.env.EXPO_PUBLIC_GENERATE_MACROS_URL!
    );
    return res.data.macros as Macros;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateGoalWeight() {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL +
        process.env.EXPO_PUBLIC_GENERATE_GOAL_WEIGHT_URL!
    );
    return res.data.newGoalWeight;
  } catch (error) {
    return false;
  }
}
