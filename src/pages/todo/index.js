import Head from "next/head"
import { TodoList } from "@/components/todoList"
import Header from "@/components/Header"
import TodoInput from "@/components/TodoInput"
import React, { useEffect, useState } from 'react';
import Section from "@/components/Section";

const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const todoMessages = ["Looks like you still have quite a few things to do..."]

export default function Home() {
	const API_ENDPOINT = "https://backend-9v7v.api.codehooks.io/dev/todoItem"
	const API_KEY = " 0ddb5c05-243e-4493-9625-8dd18a1e59f7"
	
	const [todoData, setTodos] = useState(null);
	const [styleData, setStyle] = useState(null);

	function validEntry(dict){
		return "false" === dict["checked"]
	}

	const addTodo = async (text) =>  {
		// var [data, styling] = gatherListData()
		var uploadData = {
			"checked": "false",
			"todo": text
		}
		await fetch(API_ENDPOINT, {
			method: 'POST',
			headers: {
				'x-apikey': API_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(uploadData)
		}).then((response) => {
			return response.json()
		}).then((data) => {
			const newId = data['_id']
			//Retrieve todo list
			var updatedList = [...todoData]
			var updatedStyle = {...styleData}

			//Add to todoList
			updatedList.unshift({
				"_id": newId,
				"checked": "false",
				"todo": text
			})

			updatedStyle[newId] = {...uncheckedStyling}

			//update todoList
			setTodos(updatedList)
			setStyle(updatedStyle)
		})
	}

	
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
		  const response = await fetch(API_ENDPOINT, {
			'method':'GET',
			'headers': {'x-apikey': API_KEY}
		  })
		  const data = await response.json()
		  // update state -- configured earlier.
		  data.reverse()
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
				<Section textOptions={todoMessages} />
				<TodoInput addTodo={addTodo}/>
				<TodoList passedInList={todoData} defaultStyling={styleData} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling} validEntry={validEntry}>
	
				</TodoList>
			</>	
		)
		}
	
}




function createDefaultStyle(data) {
	var initStyle = {}
	for (var i = 0; i < data.length; i++){
		initStyle[data[i]['_id']] = {...uncheckedStyling}
	} 
	return initStyle
}

