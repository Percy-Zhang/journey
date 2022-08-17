import React, { useState, Dispatch, SetStateAction } from "react";
import { StyleSheet, View, Text, TouchableHighlight, LayoutRectangle, LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";

type PinNumber = string | null
type Pin = Array<PinNumber>
interface KeypadProps {
	pin : Pin
	setPin : Dispatch<SetStateAction<Pin>>
	styles? : StyleProp<ViewStyle>
}
interface NumpadButtonProps extends KeypadProps {
	width: number
	num: string | null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pinInputGroup: {
		flexDirection: 'row',
	},
	pinInputBox: {
		flex: 1,
		marginHorizontal: '1%',
		textAlign: 'center',
		borderBottomWidth: 1,
	},
	pinInputText: {
		textAlign: 'center',
		fontSize: 30,
	},
	numpad: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	numpadButton: {
		width: '33.3%',
		height: '25%',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	numpadText: {
		fontSize: 30,
	},
})


export default function Keypad(props : KeypadProps) {
	const [layout, setLayout] = useState({} as LayoutRectangle)
	const buttonProps = { pin:props.pin, setPin:props.setPin, width:layout.width }
	const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', '<']

	const onLayout = (e : LayoutChangeEvent) => setLayout(e.nativeEvent.layout)

	return (
		<View style={[styles.container, props.styles]}>
			<View style={styles.pinInputGroup}>
				{props.pin.map((pinNumber, i) => (
					<View key={i} style={styles.pinInputBox}>
						<Text style={styles.pinInputText}>{!!pinNumber ? '*' : ''}</Text>
					</View>
				))}
			</View>
			<View onLayout={onLayout} style={styles.numpad}>
				{Object.keys(layout).length > 0 && nums.map(num => <NumpadButton key={num} num={num} {...buttonProps} />)}
			</View>
		</View>

	)
}

const NumpadButton = (props : NumpadButtonProps) => {
	const parentWidth = props.width

	const onPress = () => props.num == '<' ? remove() : add(props.num)

	const remove = () => {
		const newPin = props.pin.map(pinNumber => pinNumber)
		for (let i = props.pin.length - 1; i >= 0; i--) {
			if (props.pin[i] == null) continue
			newPin[i] = null
			props.setPin(newPin)
			break
		}
	}

	const add = (num : string | null) => {
		const newPin = props.pin.map(pinNumber => pinNumber)
		for (let i in props.pin) {
			if (props.pin[i] != null) continue
			newPin[i] = num
			props.setPin(newPin)
			break	
		}
	}

	return (
		<TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.1)'} onPress={onPress} 
		disabled={!props.num} style={[styles.numpadButton, {maxHeight: parentWidth/3}]}
		>
			<Text style={styles.numpadText}>{props.num}</Text>
		</TouchableHighlight>
	)
}