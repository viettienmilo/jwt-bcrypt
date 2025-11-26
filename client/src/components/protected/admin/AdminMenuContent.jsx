import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import GroupIcon from '@mui/icons-material/Group';

import { useUIStore } from '../../../store/useUserStore.js';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

const listItems = [
  { text: 'Courses', icon: <LocalLibraryIcon />, path: 'admin' },
  { text: 'Students', icon: <SchoolIcon />, path: 'admin/students' },
  { text: 'Grades', icon: <GradingIcon />, path: 'admin/grades' },
  { text: 'Users', icon: <GroupIcon />, path: 'admin/users' },
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: 'admin/settings' },
];

export default function AdminMenuContent() {

  const setDashboardSideMenuItem = useUIStore(state => state.setDashboardSideMenuItem);
  const navigate = useNavigate();
  const location = useLocation();

  const getIndexFromPath = () => {
    const path = location.pathname.replace('/admin/', '');
    const index = listItems.findIndex(item => item.path === path);
    return index >= 0 ? index : 0;   // fallback to courses
  };

  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromPath());

  const handleClick = (text, index) => {
    setDashboardSideMenuItem(text);
    setCurrentIndex(index);
    navigate(`/${listItems[index]?.path}`)
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {listItems.slice(0, 3).map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === currentIndex} onClick={() => handleClick(item.text, index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {listItems.slice(3).map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index + 3 === currentIndex} onClick={() => handleClick(item.text, index + 3)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
