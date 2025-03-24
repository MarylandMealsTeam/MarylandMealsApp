export default interface Meal {
  id: number;
  menu_item: {
    id: number;
    name: string;
    ingredients: string;
    image: any;
    calories: number;
    carbs: number;
    protein: number;
    fats: number;
    allergens?: string[];
    serving_size?: string;
  };
  date: string;
  dh_y: boolean;
  dh_south: boolean;
  dh_251: boolean;
}
