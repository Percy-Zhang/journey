import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

import { VerifyPinScreenRouteProps } from "../../types/NativeStackParamsList";

import { theme } from "../../components/MyContext";
import Keypad from "../../components/Keypad";
import Header from "../../components/Header";
import { readAsyncStorage } from "../../helpers";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.primaryLight,
	},
	keypad: {
		paddingTop: '50%',
		alignSelf: 'center',
		width: '95%',
	},
})

type PinNumber = string | null
type Pin = Array<PinNumber>

const emptyPin : Pin = [null, null, null, null, null, null]

export default function VerifyPin() {
	const { params } = useRoute<VerifyPinScreenRouteProps>()
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
				Alert.alert('Error', 'Pin could not be retrieved.')
			} else if (pinString == correctPin ) {
				Alert.alert('Success')
				params.onSuccess()
			} else {
				setPin(emptyPin)
			}
		}, 0)
	}, [pinString])

	return pinRetrieved 
	? (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryLight} barStyle='dark-content' animated/>
			<Header title={`Verify PIN`} color={theme.primaryLight}/>
			<Keypad pin={pin} setPin={setPin} styles={styles.keypad} />
		</View>
	) : (
		<View style={styles.container} />
	)
}

