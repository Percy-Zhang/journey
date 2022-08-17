import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import RNFS from 'react-native-fs'
import RNDP from 'react-native-document-picker'

import { SettingsScreenNavigationProps } from '../../types/NativeStackParamsList';

import { encrypt, decrypt, isJournal, writeAsyncStorage } from '../../helpers';

export function exportJournal(journal: Journal) {
	const journalString = JSON.stringify(journal)
	const journalEncrypted = encrypt(journalString)
	const currentTime = new Date().getTime().toString()
	const path = RNFS.DownloadDirectoryPath + `/journal_backup_${currentTime}.txt`
	RNFS.writeFile(path, journalEncrypted, 'utf8')
	.then(() => {
		Alert.alert('Success', `journal_backup_${currentTime}.txt saved in Downloads folder.`)
	})
	.catch(() => {
		Alert.alert('Error', 'Please try again.')
	});
}

export async function importJournal(setJournal : Dispatch<SetStateAction<Journal>>, navigation : SettingsScreenNavigationProps) {
	let decryptedContent = ''
	try {
		const { uri } = await RNDP.pickSingle({type: RNDP.types.plainText})
		decryptedContent = decrypt(await RNFS.readFile(uri))
	} catch (e) {
		return console.log(e, '[e314]')
	}

	const unValidatedJournal : Journal = JSON.parse(decryptedContent)
	if (isJournal(unValidatedJournal)) {
		const validJournal = unValidatedJournal

		const onSuccess = async () => {
			setJournal(validJournal)
			await writeAsyncStorage('journal', JSON.stringify(validJournal))
			alertSuccess(navigation.popToTop)
		}
		const onConfirm = () => navigation.navigate('VerifyPin', { onSuccess })
		
		alertAskConfirmation(onConfirm)

	} else {
		Alert.alert('Error', 'Wrong or corrupted file.')
	}
}

const alertAskConfirmation = (onConfirm : () => void) => {
	Alert.alert(
		'Confirm', 
		'Are you certain you want to overwrite your current journal?',
		[
			{text: 'Cancel'},
			{text: 'Yes', onPress: onConfirm},
		],
		{cancelable: true}
	)
}

const alertSuccess = (onConfirm : () => void) => {
	Alert.alert(
		'Success', 
		'Successfully imported!',
		[{text: 'Okay', onPress: onConfirm}]
	)
}
