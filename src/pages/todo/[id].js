import { useRouter } from 'next/router'
import Head from "next/head"
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import { useAuth } from "@clerk/nextjs";
import Loading from '@/components/Loading';



export default function TodoItem({params}){
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const router = useRouter()
	const { id } = router.query

	const [loading, setLoading] = useState(true)
	const [todoItem, setTodoItem] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const token = await getToken({template: "todoListTemplate"})
			const response = await fetch(API_ENDPOINT + "todoItem/" + id, {
				'method':'GET',
				'headers': {'Authorization': 'Bearer ' + token}
		  	})
		  const data = await response.json()
		  // update state -- configured earlier.
		  console.log(data)
		  setTodoItem(data["todo"])
		  setLoading(false)
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
	  }else {
		return (
			<>
				<Head>
			
				</Head>
				<Header />
				<p>TODOItem: {todoItem}</p>
			</>
		)
	  }
  
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

