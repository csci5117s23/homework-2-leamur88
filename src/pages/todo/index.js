import Head from "next/head"
import { TodoList } from "./todoList"
import Header from "./Header"
import TodoInput from "./TodoInput"
import React, { useEffect, useState } from 'react';

const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const dummyData = [
	{
		"id": 1,
		"text": "Item 1"
	},
	{
		"id": 2,
		"text": "Item 2"
	},
	{
		"id": 3,
		"text": "Item 3"
	},
	{
		"id": 4,
		"text": "Item 4"
	}

]

export default function Home() {
	const initData = gatherInitialListData()
	const styling = createDefaultStyle(initData)
	const [todoData, setTodos] = useState(initData);
	const [styleData, setStyle] = useState(styling);

	function addTodo( text ) {
		// var [data, styling] = gatherListData()
		var newId = dummyData.length + 1
		//Add to todoList
		dummyData.push({
				"id": newId,
				"text": text
		})
		//Retrieve todo list
		var updatedList = [...dummyData]
		var updatedStyle = {...styling}

		updatedStyle[newId] = {...uncheckedStyling}

		//update todoList
		setTodos(updatedList)
		setStyle(updatedStyle)
		console.log(styleData, updatedStyle)
	}
	return (
		<>
			<Head>

			</Head>
			<Header />
			<TodoInput addTodo={addTodo}/>
			<TodoList passedInList={todoData} defaultStyling={styleData} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling}>

			</TodoList>
		</>	
	)
}



function createDefaultStyle(data) {
	var initStyle = {}
	for (var i = 0; i < data.length; i++){
		initStyle[data[i]['id']] = {...uncheckedStyling}
	} 
	return initStyle
}




function gatherInitialListData () {
	return dummyData
}
