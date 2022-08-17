import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import { theme } from '../../components/MyContext';
import Header from '../../components/Header';
import Input from './Input';
import { readAsyncStorage, writeAsyncStorage } from '../../helpers';
import { useNavigation } from '@react-navigation/native';
import { ChangePinScreenNavigationProps } from '../../types/NativeStackParamsList';


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: theme.primaryDark,
	},
	body: {
		padding: 20,
	},
	warning: {
		padding: 20,
		marginBottom: 10,
		backgroundColor: theme.primaryDarker,
		color: theme.primaryLight,
		borderRadius: 20,
	},
	submit: {
		marginTop: 20,
	},
	error: {
		marginTop: 20,
		textAlign: 'center',
		fontWeight: 'bold',
		color: theme.error,
	},
});

export default function ChangePin() {
	const navigation = useNavigation<ChangePinScreenNavigationProps>()
	const [error, setError] = useState('')
	const [oldPin, setOldPin] = useState('')
	const [newPin, setNewPin] = useState('')
	const [newPin2, setNewPin2] = useState('')

	const handleSubmit = async () => {
		const savedPin = await readAsyncStorage('pin')
		if (oldPin.length != 6 || newPin.length != 6 || newPin2.length != 6) return setError('Pin must be at least 6 digits')
		if (oldPin != savedPin) return setError('Old Pin is incorrect')
		if (newPin != newPin2) return setError('Your New Pin does not match')
		writeAsyncStorage('pin', newPin)
		setTimeout(navigation.goBack, 100)
	}

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`Settings`} color={theme.primaryDark}/>
			<View style={styles.body}>
				<Text style={styles.warning}>There is NO way to reset your password if you forget it</Text>
				<Input title={'Old Pin'} value={oldPin} setValue={setOldPin} />
				<Input title={'New Pin'} value={newPin} setValue={setNewPin} />
				<Input title={'Confirm New Pin'} value={newPin2} setValue={setNewPin2} />
				<SubmitButton style={styles.submit} onPress={handleSubmit}/>
				<Text style={styles.error}>{error}</Text>
			</View>
		</View>
  	)
};


interface SubmitButtonProps {
	title?: string
	style?: StyleProp<ViewStyle>
	onPress: () => void
}

const styles2 = StyleSheet.create({
	container: {
		backgroundColor: theme.primaryLight,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		borderRadius: 25,
		elevation: 10,
	},
	title: {
		// color: 'white'
	},
})

const SubmitButton = ({ title='Submit', style, onPress } : SubmitButtonProps) => {
	return (
		<TouchableOpacity style={[styles2.container, style]} onPress={onPress}>
			<Text style={styles2.title}>{title}</Text>
		</TouchableOpacity>
	)
}
