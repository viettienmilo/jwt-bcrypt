import {
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider
} from "@mui/material"

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { orange, green, deepPurple } from '@mui/material/colors';

import { useState } from "react"
import { useUserStore } from "../store/useUserStore"
import { useNavigate } from "react-router"

const UserMenu = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)
    const navigate = useNavigate();

    // open dropdown menu
    const openMenu = (event) => {
        setAnchorElement(event.currentTarget);
    }

    // close dropdown menu
    const closeMenu = () => {
        setAnchorElement(null);
    }

    // logout user
    const logoutUser = () => {
        logout();
        closeMenu();
        navigate('/login');
    }

    return (
        <>
            <Tooltip title='User settings' >
                <Avatar src={user.profilePicture || undefined}
                    sx={{ cursor: "pointer", width: 30, height: 30, bgcolor: deepPurple[500] }}
                    onClick={openMenu}
                >
                    {user.username?.[0]?.toUpperCase() ?? "X"}
                </Avatar>
            </Tooltip>
            <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={closeMenu}
                slotProps={{ // Pass props to the internal MenuList
                    'aria-labelledby': 'basic-button',
                }}
                disableAutoFocus // prevent warning focus problem
                disableAutoFocusItem // Prevent autofocus on the first item
            >
                {user.role === 'USER' &&
                    <MenuItem onClick={() => {
                        closeMenu();
                        navigate('/dashboard')
                    }}>
                        <ListItemIcon>
                            <DashboardIcon sx={{ fontSize: 22, color: green[500] }} />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>}
                {user.role === 'ADMIN' && <MenuItem onClick={() => {
                    closeMenu();
                    navigate('/admin')
                }}>
                    <ListItemIcon>
                        <DashboardIcon sx={{ fontSize: 22, color: green[500] }} />
                    </ListItemIcon>
                    Admin Panel
                </MenuItem>}
                <MenuItem onClick={() => {
                    closeMenu();
                    navigate('/profile')
                }}>
                    <ListItemIcon>
                        <SettingsIcon sx={{ fontSize: 22, color: green[500] }} />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <LogoutIcon sx={{ fontSize: 22, color: orange[500] }} />
                    </ListItemIcon>
                    Log out
                </MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu