import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView as KbAwareScroll } from 'react-native-keyboard-aware-scroll-view'

import { NewDayScreenNavigationProps } from '../../types/NativeStackParamsList';

import { getDayOfDate } from '../../helpers';
import MyContext, { theme, months } from '../../components/MyContext';
import Header from '../../components/Header';
import Star from './Star';
import { getTodayDateInfo, getSavedEntry, saveEntry } from './functions';


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

	let savedEntry = getSavedEntry(journal)
	const { month, date, day } = getTodayDateInfo()

	const [title, setTitle] = useState(savedEntry.title)
	const [body, setBody] = useState(savedEntry.body)
	const [important, setImportant] = useState(savedEntry.important)
	
	const currentEntry: Entry = { title, body, important }

	const handleSave = () => saveEntry(currentEntry, journal, setJournal, navigation)
	const toggleImportant = () => setImportant(bool => !bool)
	const showStar = () => Star(important, toggleImportant)

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`${day} ${date} ${months[month - 1]}`} rightIcon={showStar} />
			<KbAwareScroll style={styles.textContainer}>
				<TextInput style={styles.title} value={title} onChangeText={setTitle} placeholder={'Title'} />
				<TextInput multiline style={styles.body} value={body} onChangeText={setBody} placeholder={'Write...'} />
				<View style={styles.footer} />
			</KbAwareScroll>
			<TouchableOpacity style={styles.addBox} onPress={handleSave}>
				<Text style={styles.addText}>Save</Text>
			</TouchableOpacity>
		</View>
	)
};