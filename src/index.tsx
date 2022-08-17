import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';

import MyContext from "./components/MyContext";
import App from "./router";
import { readAsyncStorage } from "./helpers";

export default function() {
	const [journal, setJournal] = useState<Journal>({})

	useEffect(() => {
		getSavedJournal()
	}, [])

	const getSavedJournal = async () => {
		const savedJournal = await readAsyncStorage('journal')
		setJournal(savedJournal == null ? {} : JSON.parse(savedJournal))
	}

	const initialValue = { journal, setJournal }
	
	return (
		<MyContext.Provider value={initialValue}>
			<NavigationContainer>
				<App />
			</NavigationContainer>
		</MyContext.Provider>
	)
}