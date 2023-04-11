import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';


const pages = ['todo', 'done', 'logout'];

// https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
// https://betterprogramming.pub/building-a-basic-header-with-materialui-and-react-js-d650f75b4b0a

export default function Header() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};


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
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="flex-end">
			{pages.map((page) => (
				<Link key={"Linkto" + page} href={"/" + page}>
					<Button
					end='right'
					key={page}
					sx={{ my: 2, color: 'white', display: 'block' }}
				>
					{page}
				</Button>
				</Link>
			
			))}
		</Box>

		

		{/* Mobile Screen */}
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
			<IconButton
			size="large"
			aria-label="account of current user"
			aria-controls="menu-appbar"
			aria-haspopup="true"
			onClick={handleOpenNavMenu}
			color="inherit"
			>
			<MenuIcon />
			</IconButton>
			<Menu
			id="menu-appbar"
			anchorEl={anchorElNav}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			open={Boolean(anchorElNav)}
			onClose={handleCloseNavMenu}
			sx={{
				display: { xs: 'block', md: 'none' },
			}}
			>
			{pages.map((page) => {
				<>
				<Link key={page + " Link"} href={`/${page}/`}>
					<MenuItem key={page}>
						<Typography textAlign="center">{page.charAt(0).toUpperCase() + page.slice(1)}</Typography>
					</MenuItem>
				</Link>
				</>
				
				
  			})}
			</Menu>
		</Box>
		<Typography
			variant="h5"
			noWrap
			component="a"
			href="/"
			sx={{
				mr: 3,
				display: { xs: 'flex', md: 'none' },
				flexGrow: 1,
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