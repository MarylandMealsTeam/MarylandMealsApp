import axios, { AxiosError } from "axios";
import Meal from "@/interfaces/Meal";
import { Allergen } from "@/types/Allergen";

let menu: Meal[] = [];
let page = 0;

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MENU_BASE_URL!,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export async function getMenu(diningHalls: string[], allergens: Allergen[]) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_DAILYITEMS_URL!, {
      params: {
        date: "2025-01-28",
        page: ++page,
        // dining_halls: diningHalls.join(","),
        // allergens: allergens.map((a) => a.id).join(","),
      },
    });
    menu.push(...res.data.results);
    return menu;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function getMenuItem(id: string) {
  return menu.find((item) => item.menu_item.id === Number(id))!;
}

export async function getFood(id: number) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_DAILYITEMS_URL!, {
      params: {
        date: "2025-01-28",
        id: id,
      },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.request);
    return null;
  }
}

export function resetMenu() {
  menu = [];
  page = 0;
}
