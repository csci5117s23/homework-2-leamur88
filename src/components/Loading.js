
import { CircularProgress } from "@mui/material";

export default function Loading(){
	return (
		<>
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<CircularProgress sx={{marginTop: 2}} />
		</div>
		</>
	)
}