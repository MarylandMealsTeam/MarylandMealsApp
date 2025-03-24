import { Document, ObjectId } from "mongoose";
import Macros from "./Macros";

export type DiningHallType = "251 North" | "Yahentamitsi" | "South Campus";
export type SexType = "male" | "female";

export default interface User extends Document {
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
  height: number;
  sex: SexType;
  foodLogIds: ObjectId[];
  currentWeight: number;
  goalWeight: number;
  goalMacros: Macros;
  allergens: string[];
  diningHallPreferences: DiningHallType[];
}
