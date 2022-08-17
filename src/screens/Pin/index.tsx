import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../components/MyContext";
import Keypad from "../../components/Keypad";
import { PinScreenNavigationProps } from "../../types/NativeStackParamsList";
import { readAsyncStorage, writeAsyncStorage } from "../../helpers";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
		backgroundColor: theme.primaryLight,
	},
	h1: {
		marginVertical: '15%',
		textAlign: 'center',
		fontSize: 50,
		fontWeight: 'bold',
		fontFamily: 'cursive',
		color: theme.primaryDarker,
	},
	h2: {
		marginBottom: '15%',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.primaryDarker,
	},
	keypad: {
		alignSelf: 'center',
		width: '95%',
	},
	version: {
		textAlign: 'center',
		color: theme.secondary,
	},
})

type PinNumber = string | null
type Pin = Array<PinNumber>

const emptyPin : Pin = [null, null, null, null, null, null]

export default function Pin() {
	const navigation = useNavigation<PinScreenNavigationProps>()
	const [correctPin, setCorrectPin] = useState<string | null>(null)
	const [pinRetrieved, setPinRetrieved] = useState(false)
	const [pin, setPin] = useState<Pin>(emptyPin)
	const pinString = pin.join('')

	useEffect(() => {
		(async () => {
			const savedPin = await readAsyncStorage('pin')
			setCorrectPin(savedPin)
			setPinRetrieved(true)
		})()
	}, [])

	useEffect(() => {
		if (pinString.length != 6) return
		setTimeout(() => {
			if (correctPin == null) {
				writeAsyncStorage('pin', pinString)
				navigation.replace('Home') 
			} else if (pinString == correctPin ) {
				navigation.replace('Home') 
			} else {
				setPin(emptyPin)
			}
		}, 0)
	}, [pinString])

	return pinRetrieved 
	? (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryLight} barStyle='dark-content' />
			<Text style={styles.h1}>Journey</Text>
			{correctPin == null && <Text style={styles.h2}>Create new PIN</Text>}
			<Keypad pin={pin} setPin={setPin} styles={styles.keypad} />
			<Text style={styles.version}>v1.0</Text>
		</View>
	) : (
		<View style={styles.container} />
	)
}

