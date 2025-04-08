import { MealPlanData } from "@/components/widgets/MealPlan";
import axios from "axios";

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL! + process.env.EXPO_PUBLIC_AI_URL!,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export async function getMealPlan() {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_MENUPLAN_URL!);
    console.log(res.data.plan);
    const str = res.data.plan;
    const mealPlan: MealPlanData = JSON.parse(str);
    return mealPlan;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function suggestMacros() {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_SUGGESTMACROS_URL!);
    return res.data.macros;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default session;
