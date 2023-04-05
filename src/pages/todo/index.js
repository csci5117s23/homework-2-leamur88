import Head from "next/head"
import { TodoList } from "./todoList"
import Header from "./Header"

const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const dummyData = [
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

export default function Home() {
	return (
		<>
			<Head>

			</Head>
			<Header />
			<TodoList passedInList={gatherListData()} defaultStyling={createDefaultStyling()} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling}>

			</TodoList>
		</>	
	)
}


function gatherListData () {
	return dummyData
}

function createDefaultStyling () {
	var initStyle = {}
	for (var i = 0; i < dummyData.length; i++){
		initStyle[dummyData[i]['id']] = {...checkedStyling}
	}
	return initStyle

}
