import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
//https://betterprogramming.pub/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a
export default function Header() {
  const content = () => {
    return <Toolbar>TodoList!</Toolbar>;
  };
  
  return (
	<React.Fragment>
		<AppBar position="sticky">
		<Toolbar>{content()}</Toolbar>
		</AppBar>
  </React.Fragment>
  );
}