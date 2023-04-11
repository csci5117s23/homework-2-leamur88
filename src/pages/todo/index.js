import Head from "next/head"
import { TodoList } from "@/components/todoList"
import Header from "@/components/Header"
import TodoInput from "@/components/TodoInput"
import React, { useEffect, useState } from 'react';
import Section from "@/components/Section";
import Loading from "@/components/Loading";
import { useAuth } from "@clerk/nextjs";

const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const todoMessages = [
	"Looks like you still have quite a few things to do...", "Lets get some of these things done today!",
	"Yikes, and I thought I was falling behind...", "I'd pretend to be motivational, but if all these tasks can't motivate you I don't know what will"
]

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Home() {
	const API_KEY = " 0ddb5c05-243e-4493-9625-8dd18a1e59f7"
	
	const [todoData, setTodos] = useState(null);
	const [styleData, setStyle] = useState(null);
	const [userToken, setToken] = useState(null);
	const { isLoaded, userId, sessionId, getToken } = useAuth();

	function validEntry(dict){
		return "false" === dict["checked"]
	}

	const addTodo = async (text) =>  {
		
		// const token = await getToken({template: "todoListTemplate"})
		var uploadData = {
			"checked": "false",
			"todo": text,
			"userId": userId
		}
		await fetch(API_ENDPOINT + "todoItem", {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + userToken,
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
			const token = await getToken({template: "todoListTemplate"})
			setToken(token)
			const response = await fetch(API_ENDPOINT + "todoItem" + "?userId=" + userId, {
			'method':'GET',
			'headers': {'Authorization': 'Bearer ' + token}
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
		return (
			<>
			<Head>

			</Head>
			<Header />
			<Loading />
		</>	
		)
	  }
	  else{
		return (
			<>
				<Head>
	
				</Head>
				<Header />
				<Section textOptions={todoMessages} />
				<TodoInput addTodo={addTodo}/>
				<TodoList passedInList={todoData} defaultStyling={styleData} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling} validEntry={validEntry} EmptyMessage={"Looks like you need some things to do, maybe you should add something..."} token={userToken}>
	
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

