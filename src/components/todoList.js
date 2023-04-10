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


// https://mui.com/material-ui/react-list/#checkbox
export function TodoList({passedInList, defaultStyling, checkedStyling, uncheckedStyling}) {
	const [checked, setChecked] = React.useState([]);
	const [styling, setStyling] = React.useState(defaultStyling)

  	const handleToggle = (listItemId) => () => {
		const currentIndex = checked.indexOf(listItemId);
		const newChecked = [...checked];
		var newStyling = {...styling}
		if (currentIndex === -1) {
			newChecked.push(listItemId);
			newStyling[listItemId] = {...checkedStyling}
			
		} else {
			newChecked.splice(currentIndex, 1);
			newStyling[listItemId] = {...uncheckedStyling}
		}
		setStyling(newStyling)
		setChecked(newChecked);
  };


	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{passedInList.map((dict) => {
				const listItemId = dict['_id']
				const labelId = `checkbox-list-label-${listItemId}`;
				// console.log(listItemId, styling[listItemId])

				// if (styling[listItemId] === undefined){
				// 	var updatedStyle = {...styling}
				// 	updatedStyle[listItemId] = uncheckedStyling
				// 	setStyling(updatedStyle)
				// }

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
					<Link href={`/todo/${listItemId}`}><ListItemText primaryTypographyProps={{style: styling[listItemId]}} id={labelId} primary={dict['todo']} /></Link>
				</ListItem>
				);
			})}
		</List>
	);
}