import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, View, ScrollView } from 'react-native';

import { MonthScreenRouteProps } from '../../types/NativeStackParamsList';

import MyContext, { theme, months } from '../../components/MyContext';
import DayCard from './DayCard';
import Header from '../../components/Header';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.primaryLighter,
	},
	footer: {
		height: 200,
	},
});

export default function Month() {
	const route = useRoute<MonthScreenRouteProps>()
	const { month, year } = route.params
	const { journal } = useContext(MyContext)

	const showDayCard = (day: string) => (
		DayCard(day, month, year, journal)
	)

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`${months[parseInt(month) - 1]} ${year}`} />
			<ScrollView>
				{Object.keys(journal[year][month]).map(showDayCard)}
				<View style={styles.footer} />
			</ScrollView>
		</View>
	)
};

