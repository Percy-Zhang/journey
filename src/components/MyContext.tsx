import React, { Dispatch, SetStateAction } from "react";

interface ContextInterface {
  journal: Journal;
  setJournal: Dispatch<SetStateAction<Journal>>;
}

const MyContext = React.createContext<ContextInterface>({} as ContextInterface);

export default MyContext;

export const theme: Theme = {
  primary: "#b7fffb",
  primaryDark: "#87d0ef",
  primaryDarker: "#011e7d",
  primaryLight: "#d1faff",
  primaryLighter: "#eafdff",
  secondary: "#b7dfff",
  tertiary: "#b7ffd7",
  error: "#d40000",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
