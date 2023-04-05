import Head from "next/head"
import { TodoList } from "./todoList"
import Header from "./Header"


export default function Home() {
	return (
		<>
			<Head>

			</Head>
			<Header />
			<TodoList passedInList={gatherListData()}>

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
