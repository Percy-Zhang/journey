import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { MonthScreenRouteProps } from '../../types/NativeStackParamsList';

import MyContext, { theme, months } from '../../components/MyContext';
import DayCard from './DayCard';
import Header from '../../components/Header';


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: theme.primaryLighter,
  },
});

export default function Month() {
	const route = useRoute<MonthScreenRouteProps>()
	const {month, year} = route.params
	const { journal } = useContext(MyContext)

	const showDayCard = (day: string) => (
		DayCard(day, month, year, journal)
	)

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`${months[parseInt(month) - 1]} ${year}`} />
			{Object.keys(journal[year][month]).map(showDayCard)}
		</View>
  	)
};

