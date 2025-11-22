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

import { useUIStore } from '../../../store/useUserStore.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const listItems = [
  { text: 'Courses', icon: <LocalLibraryIcon />, path: '' },
  { text: 'Students', icon: <SchoolIcon />, path: 'students' },
  { text: 'Grades', icon: <GradingIcon />, path: 'grades' },

  { text: 'Settings', icon: <SettingsRoundedIcon />, path: 'settings' },
];


export default function AdminMenuContent() {
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
    navigate(`/admin/${listItems[currentIndex].path}`)
  }, [currentIndex]
  )

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
