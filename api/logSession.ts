import FoodLog from "@/interfaces/FoodLog";
import { getFood } from "./menuSession";
import { Meal } from "@/interfaces/Meal";
import session from "./userSession";
import { emptyMacros } from "@/interfaces/Macros";

// fix async
export async function getFoodLog(date: Date) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_URL!, {
      params: { date },
    });
    const log = res.data as FoodLog;
    const logData = await log.ids.map(async ({ id, quantity }) => {
      const food = await getFood(id);
      return { item: food.results[0], quantity };
    });

    return Promise.all(logData);
  } catch (error) {
    console.log(error);
    return [];
  }
}



// fix async
export async function getMacros(date: Date) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_URL!, {
      params: { date },
    });
    const log = res.data as FoodLog;
    const [target, consumed] = [log.target, log.consumed || emptyMacros];
    return { target, consumed };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function log(meal: Meal, quantity: number) {
  try {
    const body = { meal, quantity };
    const date = new Date();
    const res = await session.post(process.env.EXPO_PUBLIC_LOG_URL!, body, {
      params: { date },
    });
  } catch (error) {
    console.log(error);
  }
}
