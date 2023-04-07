import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

 
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
    <form onSubmit={handleSubmit}>
	<TextField
		variant="filled"
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
	/>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Todo..."
      />
    </form>
  );
};
