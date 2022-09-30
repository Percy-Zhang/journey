import { Alert } from "react-native";
import { getDayOfDate, writeAsyncStorage } from "../../helpers";
import { NewDayScreenNavigationProps } from "../../types/NativeStackParamsList";

export function getTodayDateInfo() {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const day = getDayOfDate(dateObject).slice(0, 3);
  return { year, month, date, day };
}

export async function saveEntry(
  currentEntry: Entry,
  journal: Journal,
  setJournal: React.Dispatch<React.SetStateAction<Journal>>,
  navigation: NewDayScreenNavigationProps,
) {
  const { year, month, date } = getTodayDateInfo();

  for (let key in currentEntry) {
    const value = currentEntry[key as keyof Entry];
    if (value === "") return Alert.alert("Blank", `The ${key} is empty.`);
  }

  const journalCopy = JSON.parse(JSON.stringify(journal));
  if (journalCopy[year] === undefined) journalCopy[year] = {};
  if (journalCopy[year][month] === undefined) journalCopy[year][month] = {};
  journalCopy[year][month][date] = currentEntry;

  setJournal(journalCopy);
  await writeAsyncStorage("journal", JSON.stringify(journalCopy));
  navigation.goBack();
}
