import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { months, theme } from '../../components/MyContext';
import { YearScreenNavigationProps } from '../../types/NativeStackParamsList';

const styles = StyleSheet.create({
	dayContainer: {
		marginHorizontal: 20,
		marginTop: 20,
		padding: 10,
		borderRadius: 15,
		borderWidth: 1,
		backgroundColor: theme.secondary,
		elevation: 5,
	},
	dayHeading: {
		textAlign: 'right',
		fontSize: 12,
		fontWeight: 'bold',

	},
	dayText: {
		fontSize: 20,
		fontWeight: 'bold',
  	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});


export default function RandomCard(journal: Journal) {
	const navigation = useNavigation<YearScreenNavigationProps>()
	const [date, setDate] = useState(getRandomDate(journal))
	const { year, month, day } = date
	const { title, body, important } = journal[year][month][day]
	
	useFocusEffect(useCallback(() => {
		 setDate(getRandomDate(journal))
	}, []))

	const shortMonth = months[parseInt(month) - 1].slice(0, 3)
	const importantColor = important ? {backgroundColor: theme.primaryDark} : {}

	const onPress = () => {
		const date = new Date().getDate().toString()
		if (day == date) navigation.navigate('NewDay')
		else navigation.navigate('Day', {day, month, year})
	}

	return (
		<TouchableOpacity onPress={onPress} style={[styles.dayContainer, importantColor]}>
			<Text style={styles.dayHeading}>
				Random
			</Text>
			<Text style={styles.dayText}>
				{shortMonth} {day} {important && `\u2605`}
			</Text>
			<Text style={styles.title}>
				{title}
			</Text>
			<Text numberOfLines={3}>
				{body}
			</Text>
		</TouchableOpacity>
	)
}


const getRandomKey = (obj : Object) => {
	const keys = Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b))
	return keys[Math.floor(Math.random() * keys.length)]
}

const getRandomDate = (journal: Journal) => {
	const year = getRandomKey(journal)
	const month = getRandomKey(journal[year])
	const day = getRandomKey(journal[year][month])
	return { year, month, day }
}