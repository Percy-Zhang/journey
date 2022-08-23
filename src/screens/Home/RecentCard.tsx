import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { months, theme } from '../../components/MyContext';
import { YearScreenNavigationProps } from '../../types/NativeStackParamsList';
import { getDayOfDate } from '../../helpers';

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


export default function RecentCard(journal: Journal) {
	const navigation = useNavigation<YearScreenNavigationProps>()
	const year = getLastKey(journal)
	const month = getLastKey(journal[year])
	const day = getLastKey(journal[year][month])
	const { title, body, important } = journal[year][month][day]

	const shortMonth = months[parseInt(month) - 1].slice(0, 3)
	const dayOfWeek = getDayOfDate(new Date(`${day}-${shortMonth}-${year}`)).slice(0, 3)
	const importantColor = important ? {backgroundColor: theme.primaryDark} : {}

	const onPress = () => {
		const date = new Date().getDate().toString()
		if (day == date) navigation.navigate('NewDay')
		else navigation.navigate('Day', {day, month, year})
	}

	return (
		<TouchableOpacity onPress={onPress} style={[styles.dayContainer, importantColor]}>
			<Text style={styles.dayHeading}>
				Recent
			</Text>
			<Text style={styles.dayText}>
				{shortMonth} {day} {dayOfWeek} {important && `\u2605`}
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


const getLastKey = (obj : Object) => {
	const keys = Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b))
	return keys[keys.length - 1]
}