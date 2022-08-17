import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from './MyContext';

interface Props {
	title: string
	color?: string
	home?: boolean
	rightIcon?: () => JSX.Element
}

const styles = StyleSheet.create({
	container: {
	  flexDirection: 'row',
	  height: 55,
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  backgroundColor: theme.primaryDark,
  },
  iconContainer: {
	  height: 55,
	  paddingHorizontal: 20,
	  alignItems: 'center',
	  justifyContent: 'center',
  },
  icon: {
	  fontSize: 15,
  },
	title: {
	  position: 'absolute',
	  width: '100%',
	  textAlign: 'center',
	  fontSize: 24,
	  fontWeight: 'bold',
  },
});

export default function Header({ title, color, home=false, rightIcon } : Props) {
	const navigation = useNavigation()
	const bgColor = color ? {backgroundColor: color} : {}

	const goBack = () => {
		navigation.goBack()
	}

 	return (
		<View style={[styles.container, bgColor]}>
			<Text style={styles.title}>{title}</Text>
			{!home && <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
				<Text style={styles.icon}>{`Back`}</Text>
			</TouchableOpacity>}
			{!!rightIcon && rightIcon()}
		</View>
  	)
};
