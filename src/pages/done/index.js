import Head from "next/head"
import { TodoList } from "../../components/todoList"
import Header from "../../components/Header"
import React, { useEffect, useState } from 'react';
import Section from "@/components/Section";


const uncheckedStyling = {
	color: "black", 
}

const checkedStyling = {
	color: "gray",
	textDecoration: "line-through"
}

const doneMessages = ["Look at all you've accomplished!"]

export default function Home() {
	const API_ENDPOINT = "https://backend-9v7v.api.codehooks.io/dev/todoItem"
	const API_KEY = " 0ddb5c05-243e-4493-9625-8dd18a1e59f7"
	
	const [todoData, setTodos] = useState(null);
	const [styleData, setStyle] = useState(null);

	function validEntry(dict){
		return "true" === dict["checked"]
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
				<Section textOptions={doneMessages} />
				<TodoList passedInList={todoData} defaultStyling={styleData} checkedStyling={checkedStyling} uncheckedStyling={uncheckedStyling} validEntry={validEntry}>
	
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

