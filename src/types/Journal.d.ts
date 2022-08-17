interface Journal {
	[year: string]: {
		[month: string]: {
			[day: string]: Entry
		}
	}
}

interface Entry {
	title: string
	body: string
	important: boolean
}