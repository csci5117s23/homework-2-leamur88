import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Link from 'next/link'

const text = {
	color: "black", 
}

const doneText = {
	color: "gray",
	textDecoration: "line-through"
}

// https://mui.com/material-ui/react-list/#checkbox
export function TodoList({passedInList}) {
	const [checked, setChecked] = React.useState([]);
	var initStyle = {}
	for (var i = 0; i < passedInList.length; i++){
		console.log(passedInList[i])
		initStyle[passedInList[i]['id']] = {...text}
	}
	const [styling, setStyling] = React.useState(initStyle)

  	const handleToggle = (listItemId) => () => {
		const currentIndex = checked.indexOf(listItemId);
		const newChecked = [...checked];
		var newStyling = {...styling}
		if (currentIndex === -1) {
			newChecked.push(listItemId);
			newStyling[listItemId] = {...doneText}
			
		} else {
			newChecked.splice(currentIndex, 1);
			newStyling[listItemId] = {...text}
		}
		setStyling(newStyling)
		setChecked(newChecked);
  };

  console.log(styling)


	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{passedInList.map((dict) => {
				const listItemId = dict['id']
				const labelId = `checkbox-list-label-${listItemId}`;

				return (
				<ListItem
					key={listItemId}
					secondaryAction={
					<IconButton edge="end" aria-label="comments">
						<CommentIcon />
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
					<Link href="/"><ListItemText primaryTypographyProps={{style: styling[listItemId]}} id={labelId} primary={dict['text']} /></Link>
				</ListItem>
				);
			})}
		</List>
	);
}