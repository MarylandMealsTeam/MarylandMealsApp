export default interface Macros {
  calories: number;
  fats: number;
  protein: number;
  carbs: number;
}

export const emptyMacros: Macros = {
  calories: 0,
  fats: 0,
  protein: 0,
  carbs: 0,
};