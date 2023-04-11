import Head from 'next/head'
import BasicHeader from "@/components/BasicHeader"
import { Button, Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'


export default function Home() {
	const router = useRouter()
	const pathname  = router.pathname;
	
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	if (!userId && pathname !== "/"){
		router.push("/")
	}
	return (
		<>
		<Head>
		
		</Head>
		<BasicHeader />
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center"}}>
			<Typography
				variant="h3"
				sx={{
					fontSize: '2.5rem',
					justifyContent: 'center',
					ml: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'monospace',
					fontWeight: 650,
				}}
			>
				Welcome to my TodoList Website!
			</Typography>
		</Box>
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", mt: 4}}>
			{userId ? (
				<Link href={"/logout"}><Button color="error" sx={{mx: 2}} variant="contained" size="large">Sign out :(</Button></Link>
			) : (
				<Link href={"/login"}><Button color="success" sx={{mx: 2}} variant="contained" size="large">Sign In/Up!</Button></Link>
			)
			
			}
			
			<Link href={"/todo"}><Button sx={{mx: 2}} variant="contained" size="large">See your Todo Items</Button></Link>
			<Link href={"/done"}><Button color="secondary" sx={{mx: 2}} variant="contained" size="large">See What you've already done!</Button></Link>
		</Box>

			<Typography
				variant="h5"
				sx={{
					display: { xs: 'flex', md: 'none' },
					flexGrow: 1,
					justifyContent: 'center',
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.15rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				Welcome to my TodoList Website!
			</Typography>
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textAlign: "center", justifyContent: "center", mt: 4, flexDirection: "column" }}>
			{userId ? (
				<Link href={"/logout"}><Button  color="error" sx={{my: 2, justifyContent: "center"}} variant="contained" size="large">Sign out :(</Button></Link>
			) : (
				<Link href={"/login"}><Button color="success" sx={{my: 2}} variant="contained" size="large">Sign In/Up!</Button></Link>
			)
			
			}
			
			<Link href={"/todo"}><Button sx={{my: 1}} variant="contained" size="large">See your Todo Items</Button></Link>
			<Link href={"/done"}><Button color="secondary" sx={{my: 2}} variant="contained" size="large">See What you've already done!</Button></Link>
		</Box>
		</>
  	)
}
