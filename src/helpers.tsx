import AsyncStorage from '@react-native-async-storage/async-storage'
import { days } from './components/MyContext'

type Name = 'journal' | 'pin'

export async function writeAsyncStorage(name: Name, value: string) : Promise<boolean> {
	const writePromises = []
	const chunks = value.match(/.{1,500000}/g)
	if (chunks == null) return false
	let index = 0
	while (index < chunks.length) {
		writePromises.push(AsyncStorage.setItem(`${name}${index}`, chunks[index]))
		index++
	}
	writePromises.push(AsyncStorage.setItem(name, `${index}`))
	await Promise.all(writePromises)
	return true
}

export async function readAsyncStorage(name: Name) : Promise<string | null> {
	const readPromises = []
	let index = 0
	const end = await AsyncStorage.getItem(name)
	if (end == null) return null
	
	while (index < parseInt(end)) {
		readPromises.push(AsyncStorage.getItem(`${name}${index}`))
		index++
	}
	const chunks = await Promise.all(readPromises)
	let masterRecord = ''
	for (let chunk of chunks) {
		masterRecord += chunk
	}
	return masterRecord
}

const key = [-3, 1, -4, 5, -9, 2, -6, 5]

export function encrypt(plainText : string) : string {
	let encryptedText = ''
	for (let i = 0; i < plainText.length; i++) {
		const charCode = plainText[i].charCodeAt(0) + key[i % key.length]
		const char = String.fromCharCode(charCode)
		encryptedText += char
	}
	return encryptedText
}

export function decrypt(encryptedText : string) : string {
	let plainText = ''
	for (let i = 0; i < encryptedText.length; i++) {
		const charCode = encryptedText[i].charCodeAt(0) - key[i % key.length]
		const char = String.fromCharCode(charCode)
		plainText += char
	}
	return plainText
}

export function isJournal(journalString : string) {
	try {
		const journal : Journal = JSON.parse(journalString)
		for (let year in journal) {
			for (let month in journal[year]) {
				for (let day in journal[year][month]) {
					const keys = Object.keys(journal[year][month][day])
					const correctKeys = ['title', 'body', 'important']
					if (keys.sort().join() != correctKeys.sort().join()) {
						throw TypeError
					}
				}
			}
		}
		return true
	} catch (e) {console.log(e);return false}
}

export function getDayOfDate(date : Date) {
	return days[date.getDay()]
}