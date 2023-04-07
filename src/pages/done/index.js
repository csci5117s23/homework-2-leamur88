import Head from "next/head"
import { TodoList } from "../../components/todoList"
import Header from "../../components/Header"


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
	const [data, styling] = gatherListData()
	return (
		<>
			<Head>

			</Head>
			<Header />
			<TodoList passedInList={data} defaultStyling={styling} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling}>

			</TodoList>
		</>	
	)
}


function gatherListData () {
	var initStyle = {}
	for (var i = 0; i < dummyData.length; i++){
		initStyle[dummyData[i]['id']] = {...uncheckedStyling}
	} 

	return [dummyData, initStyle]
}