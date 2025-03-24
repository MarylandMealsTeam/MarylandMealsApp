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
    return res.data.plan;
  } catch (error) {
    console.log(error);
    return null;
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
