import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';



const pages = ['todo', 'done', 'logout'];

// https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
// https://betterprogramming.pub/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a

export default function Header() {

  const content = () => {
    return(
	<Toolbar disableGutters>

		{/* Desktop Screen */}
		<Typography
			variant="h6"
			noWrap
			component="a"
			href="/"
			sx={{
				ml: 2,
				display: { xs: 'none', md: 'flex' },
				fontFamily: 'monospace',
				fontWeight: 650,
			}}
		>
			TodoList!
		</Typography>

		

		{/* Mobile Screen */}
			<Typography
				variant="h5"
				noWrap
				component="a"
				href="/"
				sx={{
					display: { xs: 'flex', md: 'none' },
					flexGrow: 1,
					justifyContent: 'center',
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				TodoList
			</Typography>
	</Toolbar>
	)
  };
  
  return (
	<React.Fragment>
		<AppBar position="sticky">
		{content()}
		</AppBar>
  </React.Fragment>
  );
}