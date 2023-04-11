import Head from "next/head"
import { TodoList } from "@/components/todoList"
import Header from "@/components/Header"
import Loading from "@/components/Loading"
import React, { useEffect, useState } from 'react';
import Section from "@/components/Section";
import { useAuth } from "@clerk/nextjs";



const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const doneMessages = [
	"Look at all you've accomplished!", "Keep up the great work!", 
	"I hope you didn't check any of these off by mistake...", "WOHOOOOOO!"
]

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Home() {
	const API_KEY = " 0ddb5c05-243e-4493-9625-8dd18a1e59f7"
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const [todoData, setTodos] = useState(null);
	const [styleData, setStyle] = useState(null);
	const [userToken, setToken] = useState(null);


	function validEntry(dict){
		return "true" === dict["checked"]
	}

	
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
		const token = await getToken({template: "todoListTemplate"})
		setToken(token)
		const response = await fetch(API_ENDPOINT + "todoItem", {
			'method':'GET',
			'headers': {'Authorization': 'Bearer ' + token}
		  })
		  const data = await response.json()
		  // update state -- configured earlier.
		  data.reverse()
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
		</>	)
	  }
	  else{
		return (
			<>
				<Head>
	
				</Head>
				<Header />
				{
					todoData.length > 0 ? (<Section textOptions={doneMessages} />) : (<></>)
				}
				<TodoList passedInList={todoData} defaultStyling={styleData} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling} validEntry={validEntry} EmptyMessage={"Looks like you need to find some time in your calendar because you've got nothing done so far..."} token={userToken}>
	
				</TodoList>
			</>	
		)
		}
	
}



function createDefaultStyle(data) {
	var initStyle = {}
	for (var i = 0; i < data.length; i++){
		initStyle[data[i]['_id']] = {...checkedStyling}
	} 
	return initStyle
}

