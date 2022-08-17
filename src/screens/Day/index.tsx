import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView as KbAwareScroll } from 'react-native-keyboard-aware-scroll-view'

import { DayScreenRouteProps } from '../../types/NativeStackParamsList';
import MyContext, { theme, months } from '../../components/MyContext';
import Header from '../../components/Header';


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
});

export default function Day() {
	const route = useRoute<DayScreenRouteProps>()
	const {day, month, year} = route.params
	const { journal } = useContext(MyContext)

	const { title, body, important } = journal[year][month][day]

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`${day} ${months[parseInt(month) - 1]} ${year} ${important ? `\u2605` : ''}`} />
			<KbAwareScroll style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.body} selectable>{body}</Text>
				<View style={styles.footer} />
			</KbAwareScroll>
		</View>
  	)
};