import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from "react-native"

const styles2 = StyleSheet.create({
	iconWrapper: {
		paddingHorizontal: 20,
	},
	icon: {
		fontSize: 26,
	},
})

export default function Star(on: boolean, toggle: () => void) {
	return (
		<TouchableOpacity style={styles2.iconWrapper} onPress={toggle}>
			<Text style={styles2.icon}>{on ? `\u2605` : `\u2606`}</Text>
		</TouchableOpacity>
	)
}