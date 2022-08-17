import React, { useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SettingsScreenNavigationProps } from '../../types/NativeStackParamsList';

import MyContext, { theme } from '../../components/MyContext';
import Header from '../../components/Header';
import SettingsCard from './SettingsCard';
import { exportJournal, importJournal } from './functions';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.primaryDark,
	},
	body: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 20,
	},
});

export default function Settings() {
	const { journal, setJournal } = useContext(MyContext)
	const navigation = useNavigation<SettingsScreenNavigationProps>()

	const goToChangePin = () => navigation.navigate('ChangePin')
	const handleExport = () => exportJournal(journal)
	const handleImport = () => importJournal(setJournal, navigation)

 	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.primaryDark} barStyle={'dark-content'} animated />
			<Header title={`Settings`} color={theme.primaryDark}/>
			<View style={styles.body}>
				<SettingsCard title='Change Pin' body='Security' onPress={goToChangePin} />
				<SettingsCard title='Export' body='to a file' onPress={handleExport} />
				<SettingsCard title='Import' body='from a file' onPress={handleImport} />
			</View>
		</View>
  	)
};

