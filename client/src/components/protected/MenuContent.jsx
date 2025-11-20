import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FitbitRoundedIcon from '@mui/icons-material/FitbitRounded';
import { useUIStore } from './../../store/useUserStore.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const listItems = [
  { text: 'Overview', icon: <FitbitRoundedIcon />, path: '' },
  { text: 'Courses', icon: <AnalyticsRoundedIcon />, path: 'course' },
  { text: 'Grades', icon: <PeopleRoundedIcon />, path: 'grades' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: 'tasks' },
  { text: 'My Profile', icon: <InfoRoundedIcon />, path: 'profile' },
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: 'settings' },
];



export default function MenuContent() {
  const { dashboardSideMenuItem, setDashboardSideMenuItem } = useUIStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleClick = (text, index) => {
    setDashboardSideMenuItem(text);
    setCurrentIndex(index);
  }

  useEffect(() => {
    const idx = listItems.findIndex(item => item.text === dashboardSideMenuItem);
    setCurrentIndex(idx);
  }, []
  )

  useEffect(() => {
    navigate(`/user/dashboard/${listItems[currentIndex].path}`)
  }, [currentIndex]
  )


  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {listItems.slice(0, 4).map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === currentIndex} onClick={() => handleClick(item.text, index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {listItems.slice(4).map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index + 4 === currentIndex} onClick={() => handleClick(item.text, index + 4)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
