import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView as KbAwareScroll } from 'react-native-keyboard-aware-scroll-view'

import { NewDayScreenNavigationProps } from '../../types/NativeStackParamsList';

import { writeAsyncStorage } from '../../helpers';
import MyContext, { theme, months } from '../../components/MyContext';
import Header from '../../components/Header';
import Star from './Star';


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: theme.primaryLighter,
	},
	textContainer: {
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingVertical: 5,
	},
	body: {
		fontSize: 16,
		lineHeight: 28,
		paddingVertical: 5,
	},
	footer: {
		height: 200,
	},
	addBox: {
		position: 'absolute',
		right: 25,
		bottom: 25,
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.secondary,
		borderRadius: 50,
		elevation: 3
	},
	addText: {
		color: theme.primaryDarker,
		fontSize: 18,
	},
});

export default function NewDay() {
	const navigation = useNavigation<NewDayScreenNavigationProps>()
	const { journal, setJournal } = useContext(MyContext)
	
	const dateObject = new Date()
	const year = dateObject.getFullYear()
	const month = dateObject.getMonth() + 1
	const date = dateObject.getDate()
	const savedEntry = journal[year][month][date]

	const [title, setTitle] = useState(savedEntry?.title)
	const [body, setBody] = useState(savedEntry?.body)
	const [important, setImportant] = useState(savedEntry?.important)

	const saveEntry = async () => {
		const toBeSaved : Entry = {title, body, important}
		const keys = Object.keys(toBeSaved) as Array<keyof Entry>
		for (let key of keys) {
			if (toBeSaved[key] === '') return Alert.alert('Blank', `The ${key} is empty.`)
		}
		const journalCopy = JSON.parse(JSON.stringify(journal))
		if (journalCopy[year] != undefined && journalCopy[year][month] != undefined) journalCopy[year][month][date] = toBeSaved
		if (journalCopy[year] == undefined) journalCopy[year] = {}
		if (journalCopy[year][month] == undefined) journalCopy[year][month] = {}
		if (journalCopy[year][month][date] == undefined) journalCopy[year][month][date] = toBeSaved
		setJournal(journalCopy)
		await writeAsyncStorage('journal', JSON.stringify(journalCopy))
		navigation.goBack()
	}

	const toggleImportant = () => setImportant(bool => !bool)
	
	const showStar = () => (
		Star(important, toggleImportant)
	)

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`${date} ${months[month - 1]} ${year}`} rightIcon={showStar}/>
			<KbAwareScroll style={styles.textContainer}>
				<TextInput style={styles.title} value={title} onChangeText={setTitle} placeholder={'Title'} />
				<TextInput multiline style={styles.body} value={body} onChangeText={setBody} placeholder={'Write...'}/>
				<View style={styles.footer} />
			</KbAwareScroll>
			<TouchableOpacity style={styles.addBox} onPress={saveEntry}>
				<Text style={styles.addText}>Save</Text>
			</TouchableOpacity>
		</View>
  	)
};
