import Head from "next/head"
import { TodoList } from "../todo/todoList"
import Header from "../todo/Header"


const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

export default function Home() {
	return (
		<>
			<Head>

			</Head>
			<Header />
			<TodoList passedInList={gatherListData()} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling}>

			</TodoList>
		</>	
	)
}

function gatherListData () {
	return [
		{
			"id": 0,
			"text": "Item 1"
		},
		{
			"id": 1,
			"text": "Item 2"
		},
		{
			"id": 2,
			"text": "Item 3"
		},
		{
			"id": 4,
			"text": "Item 4"
		}

	]
}