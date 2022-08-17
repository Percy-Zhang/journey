import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NativeStackParamsList } from "./types/NativeStackParamsList";

import Pin from "./screens/Pin";
import Home from "./screens/Home";
import Year from "./screens/Year";
import Month from "./screens/Month";
import Day from "./screens/Day";
import NewDay from "./screens/NewDay";
import Settings from "./screens/Settings";
import ChangePin from "./screens/ChangePin";
import VerifyPin from "./screens/VerifyPin";


const Stack = createNativeStackNavigator<NativeStackParamsList>();

export default function App() {
	return (
		<Stack.Navigator screenOptions={{ 
			headerShown: false, 
		}}>
			<Stack.Screen name="Pin" component={Pin} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Year" component={Year} />
			<Stack.Screen name="Month" component={Month} />
			<Stack.Screen name="Day" component={Day} />
			<Stack.Screen name="NewDay" component={NewDay} />
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="ChangePin" component={ChangePin} />
			<Stack.Screen name="VerifyPin" component={VerifyPin} />
		</Stack.Navigator>
	)
}

