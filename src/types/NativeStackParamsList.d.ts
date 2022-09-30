import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type NativeStackParamsList = {
  Pin: undefined;
  Home: undefined;
  Year: { year: string };
  Month: { year: string; month: string };
  Day: { year: string; month: string; day: string };
  NewDay: undefined;
  Settings: undefined;
  ChangePin: undefined;
  VerifyPin: { onSuccess: () => void };
};

export type PinScreenNavigationProps = NativeStackNavigationProp<NativeStackParamsList, "Pin">;
export type HomeScreenNavigationProps = NativeStackNavigationProp<NativeStackParamsList, "Home">;
export type YearScreenNavigationProps = NativeStackNavigationProp<NativeStackParamsList, "Year">;
export type MonthScreenNavigationProps = NativeStackNavigationProp<NativeStackParamsList, "Month">;
export type DayScreenNavigationProps = NativeStackNavigationProp<NativeStackParamsList, "Day">;
export type NewDayScreenNavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  "NewDay"
>;
export type SettingsScreenNavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  "Settings"
>;
export type ChangePinScreenNavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  "ChangePin"
>;
export type VerifyPinScreenNavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  "VerifyPin"
>;

export type PinScreenRouteProps = RouteProp<NativeStackParamsList, "Pin">;
export type HomeScreenRouteProps = RouteProp<NativeStackParamsList, "Home">;
export type YearScreenRouteProps = RouteProp<NativeStackParamsList, "Year">;
export type MonthScreenRouteProps = RouteProp<NativeStackParamsList, "Month">;
export type DayScreenRouteProps = RouteProp<NativeStackParamsList, "Day">;
export type NewDayScreenRouteProps = RouteProp<NativeStackParamsList, "NewDay">;
export type SettingsScreenRouteProps = RouteProp<NativeStackParamsList, "Settings">;
export type ChangePinScreenRouteProps = RouteProp<NativeStackParamsList, "ChangePin">;
export type VerifyPinScreenRouteProps = RouteProp<NativeStackParamsList, "VerifyPin">;
