import { useRouter } from 'next/router'
import Head from "next/head"
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import { useAuth } from "@clerk/nextjs";
import Loading from '@/components/Loading';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import NotFound from '../404';



export default function TodoItem({params}){
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const router = useRouter()
	const { id } = router.query

	const [loading, setLoading] = useState(true)
	const [todoItem, setTodoItem] = useState(null)
	const [userToken, setToken] = useState(null);
	const [checked, setChecked] = useState(null);

	const updateCheck = async () => {
		var body = null
		if (checked){
			body = {
				"checked": "false"
			}
		} else{
			body = {
				"checked": "true"
			}
		}
		console.log("Checked", checked)
		console.log("Body!", body)
		
		await fetch(API_ENDPOINT + "todoItem/" + id, {
			method: 'PATCH',
			headers: {
				'Authorization': 'Bearer ' + userToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		setChecked(!checked)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!todoItem) return;
		const body = {
			"todo": todoItem
		}
		await fetch(API_ENDPOINT + "todoItem/" + id, {
			method: 'PATCH',
			headers: {
				'Authorization': 'Bearer ' + userToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}).then(() => {
			if (checked){
				router.push("/done")
			} else{
				router.push("/todo")
			}
			
		})
	  };

	useEffect(() => {
		const fetchData = async () => {
			const token = await getToken({template: "todoListTemplate"})
			setToken(token)
			const response = await fetch(API_ENDPOINT + "todoItem/" + id, {
				'method':'GET',
				'headers': {'Authorization': 'Bearer ' + token}
		  	})
		  const data = await response.json()
		  // update state -- configured earlier.
		  console.log(data)
		  setTodoItem(data["todo"])
		  setChecked(data["checked"] === "true")
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
	}
	else {
		if (!todoItem){
			return(
				<>
					<NotFound />
				</>
			)
		}else{
			return (
				<>
					<Head>
				
					</Head>
					<Header />
					<Box
						component="form"
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						sx={{
							'& > :not(style)': { m: 1, width: '50%' },
						}}
						noValidate
						autoComplete="off"
					>
						{checked ? (
							<Button onClick={updateCheck} variant={"outlined"} color="success">
								This Item is currently done, click me to change that!
							</Button>
							) : (
							<Button onClick={updateCheck} variant={"outlined"} color="error">
								This Item is NOT done, click me to change that!
							</Button>
						)}
						
						
					</Box>
					
					<Box
						component="form"
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						sx={{
							'& > :not(style)': { m: 1, width: '50%' },
						}}
						noValidate
						autoComplete="off"
					>

						<TextField
							variant="filled"
							label="Update Todo..."
							multiline
							value={todoItem}
							rows={4}
							width="50%"
							onChange={(e) => setTodoItem(e.target.value)}
						/>
						

					</Box>
					<Box
						component="form"
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection="column"
						sx={{
							'& > :not(style)': { m: 1, width: '25%' },
						}}
						noValidate
						autoComplete="off"
					>
						<Button onClick={handleSubmit} variant={"contained"}>
							Save Changes
						</Button>
					</Box>
					
				</>
			)
		}
	}
  
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

