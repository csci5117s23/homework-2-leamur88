import { Box, Typography } from "@mui/material";


export default function Section({textOptions}){
	console.log("In Section", textOptions[getRandom(textOptions.length)])
	return(
		<>
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={"center"}>
			<Typography
				variant="h5"
				noWrap
				textAlign="center"
				sx={{
					my: 2,
					fontFamily: 'monospace',
					fontWeight: 650,
				}}
			>
				{textOptions[getRandom(textOptions.length)]}
			</Typography>
		</Box>
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} justifyContent={"center"}>
			<Typography
			variant="h6"
			
			textAlign="center"
			sx={{
				my: 2,
				mr: 1,
				ml: 1,
				flexGrow: 1,
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
			}}
			>
			{textOptions[getRandom(textOptions.length)]}
			</Typography>
		</Box>
		</>

	)
	
}


function getRandom(n){
	return Math.floor(Math.random() * n);
}