import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

const potentialTodoItems = [
	"Take out the trash", "Do the laundry", 
	"Go grocery shopping", "Give this student an A"
]

 
export default function TodoInput ({ addTodo }){
  const [text, setText] = useState('');
  const styles = {
	width: "100%"
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addTodo(text);
    setText('');
  };
 
  return (
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
			label="Add Todo..."
			multiline
			value={text}
			rows={4}
			onChange={(e) => setText(e.target.value)}
			placeholder={potentialTodoItems[getRandom(potentialTodoItems.length)]}
		/>
		<Button onClick={handleSubmit} variant={"contained"}>
			Add Todo!
		</Button>

	</Box>
	
  );
};


function getRandom(n){
	return Math.floor(Math.random() * n);
}
