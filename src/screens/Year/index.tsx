import React, { useContext } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { YearScreenRouteProps } from '../../types/NativeStackParamsList';

import MonthCard from './MonthCard';
import Header from '../../components/Header';
import MyContext, { theme } from '../../components/MyContext';


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: theme.primaryLighter,
  },
	footer: {
	  height: 10
  },
});

export default function Year() {
	const route = useRoute<YearScreenRouteProps>()
	const year = route.params.year
	const { journal } = useContext(MyContext)

	const showMonthCard = Object.keys(journal[year]).map(month => MonthCard(month, year, journal))

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={year} />
			<ScrollView>
				{showMonthCard}
				<View style={styles.footer}/>
			</ScrollView>
		</View>
  	)
};