import Head from 'next/head'
import BasicHeader from "@/components/BasicHeader"
import { Button, Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'


export default function NotFound() {
	// const router = useRouter()
	// const pathname  = router.pathname;
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
				Looks like you got a broken link...
			</Typography>
		</Box>
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", mt: 4}}>
			<Link href={"/todo"}><Button sx={{mx: 2}} variant="contained" size="large">Go back to Todo Items</Button></Link>
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
				Looks like you got a broken link...
			</Typography>
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textAlign: "center", justifyContent: "center", mt: 4, flexDirection: "column" }}>
			<Link href={"/todo"}><Button sx={{mx: 2}} variant="contained" size="large">Go back to Todo Items</Button></Link>
		</Box>
		</>
  	)
}
