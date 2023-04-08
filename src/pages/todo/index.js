import Head from "next/head"
import { TodoList } from "../../components/todoList"
import Header from "../../components/Header"
import TodoInput from "../../components/TodoInput"
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
	
	const [todoData, setTodos] = useState(null);
	const [styleData, setStyle] = useState(null);

	function addTodo( text ) {
		// var [data, styling] = gatherListData()
		var newId = todoData.length + 1
		
		//Retrieve todo list
		var updatedList = [...todoData]
		var updatedStyle = {...styleData}

		//Add to todoList
		updatedList.unshift({
			"id": newId,
			"text": text
		})

		updatedStyle[newId] = {...uncheckedStyling}

		//update todoList
		setTodos(updatedList)
		setStyle(updatedStyle)
	}

	const API_ENDPOINT = "https://backend-o9jo.api.codehooks.io/dev/todoItem"
	const API_KEY = "29a392a9-b940-4416-886f-69308cf422ad"
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
		  const response = await fetch(API_ENDPOINT, {
			'method':'GET',
			'headers': {'x-apikey': API_KEY}
		  })
		  const data = await response.json()
		  // update state -- configured earlier.
		  console.log(data)
		  setTodos(data);
		  const styling = createDefaultStyle(data)
		  setStyle(styling)
		  setLoading(false);
		}
		fetchData();
	  }, [])
	  if (loading){
		return (<span>LOADING ...</span>)
	  }
	  else{
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
