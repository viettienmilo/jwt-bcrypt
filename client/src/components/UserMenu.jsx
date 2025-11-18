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
import MenuButton from "./protected/MenuButton";
import { logoutService } from './../services/authServices.js';

const UserMenu = () => {
    const [anchorElement, setAnchorElement] = useState(null);
    const user = useUserStore(state => state.user);
    const role = useUserStore(state => state.role);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();

    const open = Boolean(anchorElement);

    const handleClick = (event) => {
        setAnchorElement(event.currentTarget);
    };

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
        logoutService();
        logout();
        closeMenu();
        navigate('/user/login');
    }

    return (
        <>
            <Tooltip title='User settings' >
                <MenuButton
                    aria-label="Open menu"
                    onClick={handleClick}
                    sx={{
                        border: 'none',        // <── removes border completely
                        boxShadow: 'none',     // optional, in case of shadow or focus outline
                        p: 0,                  // optional: remove extra padding if you just want avatar size
                        '&:hover': {
                            backgroundColor: 'transparent', // keep clean hover
                        },
                    }}
                >
                    <Avatar src={user.avatarUrl || undefined}
                        sx={{ cursor: "pointer", width: 30, height: 30, bgcolor: deepPurple[500] }}
                        onClick={openMenu}
                    >
                        {user.username?.[0]?.toUpperCase() ?? "X"}
                    </Avatar>
                </MenuButton>

            </Tooltip>
            <Menu
                anchorEl={anchorElement}
                open={open}
                onClose={closeMenu}
                slotProps={{ // Pass props to the internal MenuList
                    'aria-labelledby': 'basic-button',
                }}
                disableAutoFocus // prevent warning focus problem
                disableAutoFocusItem // Prevent autofocus on the first item
            >
                {
                    role === 'STUDENT' &&
                    <MenuItem onClick={() => {
                        closeMenu();
                        navigate('/user/dashboard')
                    }}>
                        <ListItemIcon>
                            <DashboardIcon sx={{ fontSize: 22, color: green[500] }} />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>
                }
                {
                    role === 'ADMIN' && <MenuItem onClick={() => {
                        closeMenu();
                        navigate('/user/admin')
                    }}>
                        <ListItemIcon>
                            <DashboardIcon sx={{ fontSize: 22, color: green[500] }} />
                        </ListItemIcon>
                        Admin Panel
                    </MenuItem>
                }
                <MenuItem onClick={() => {
                    closeMenu();
                    navigate('/user/profile')
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