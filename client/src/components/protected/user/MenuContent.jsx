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

import { useUIStore } from '../../../store/useUserStore.js';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

const listItems = [
  { text: 'Overview', icon: <FitbitRoundedIcon />, path: '' },
  { text: 'Courses', icon: <AnalyticsRoundedIcon />, path: 'courses' },
  { text: 'Grades', icon: <PeopleRoundedIcon />, path: 'grades' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: 'tasks' },
  { text: 'My Profile', icon: <InfoRoundedIcon />, path: 'profile' },
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: 'settings' },
];


export default function MenuContent() {

  const setDashboardSideMenuItem = useUIStore(state => state.setDashboardSideMenuItem);
  const navigate = useNavigate();
  const location = useLocation();

  const getIndexFromPath = () => {
    const path = location.pathname.replace('/user/dashboard/', '');
    const index = listItems.findIndex(item => item.path === path);
    return index >= 0 ? index : 0;   // fallback to dashboard
  };

  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromPath());

  const handleClick = (text, index) => {
    setDashboardSideMenuItem(text);
    setCurrentIndex(index);
    navigate(`/user/dashboard/${listItems[index].path}`)
  }

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
