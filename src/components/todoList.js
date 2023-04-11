import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link'
import { Box, Typography } from "@mui/material";
import { useAuth } from "@clerk/nextjs";


const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


async function updateCheck (body, listItemId, token) {
	await fetch(API_ENDPOINT + "todoItem/" + listItemId, {
		method: 'PATCH',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then((response) => {
		return response.json()
	}).then((data) => {
		console.log(data)
	})
}


// https://mui.com/material-ui/react-list/#checkbox
export function TodoList({passedInList, defaultStyling, checkedStyling, uncheckedStyling, validEntry, EmptyMessage, token}) {

	const initChecked = passedInList.filter((dict) => {
		return dict["checked"] === "true"
	})

	const [checked, setChecked] = React.useState(initChecked.map((dict) => {
		return dict["_id"]
	}));
	const [styling, setStyling] = React.useState(defaultStyling)

  	const handleToggle = (listItemId) => () => {
		const currentIndex = checked.indexOf(listItemId);
		const newChecked = [...checked];
		var newStyling = {...styling}
		if (currentIndex === -1) {
			updateCheck({
				"checked": "true"
			}, listItemId, token);
			newChecked.push(listItemId);
			newStyling[listItemId] = {...checkedStyling}
			
		} else {
			updateCheck({
				"checked": "false"
			}, listItemId, token);
			newChecked.splice(currentIndex, 1);
			newStyling[listItemId] = {...uncheckedStyling}
		}
		setStyling(newStyling)
		setChecked(newChecked);
  };
  	if (passedInList.length === 0){
		return (
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
					{EmptyMessage}
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
				{EmptyMessage}
				</Typography>
			</Box>
		</>
		)
	}

	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{passedInList.map((dict) => {
				if (validEntry(dict)){
					const listItemId = dict['_id']
					const labelId = `checkbox-list-label-${listItemId}`;
	
					return (
					<ListItem
						key={listItemId}
						secondaryAction={
						<IconButton href={`/todo/${listItemId}`} edge="end" aria-label="comments">
							<OpenInNewIcon />
						</IconButton>
						}
						disablePadding
					>
						<ListItemButton style={{maxWidth: '30px'}} role={undefined} onClick={handleToggle(listItemId)} dense>
						<ListItemIcon>
							<Checkbox
							edge="start"
							checked={checked.indexOf(listItemId) !== -1}
							tabIndex={-1}
							disableRipple
							inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemIcon>
						
						</ListItemButton>
						<Link href={`/todo/${listItemId}`}><ListItemText primaryTypographyProps={{style: styling[listItemId]}} id={labelId} primary={dict['todo']} /></Link>
					</ListItem>
					);
				}

			})}
		</List>
	);
}