import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Button, Paper, Typography } from "@mui/material";



 
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
			placeholder="Take out the trash"
		/>
		<Button onClick={handleSubmit} variant={"contained"}>
			Add Todo!
		</Button>

	</Box>
	
  );
};
