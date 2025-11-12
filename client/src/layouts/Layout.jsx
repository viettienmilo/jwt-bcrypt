import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useUIStore } from "../store/useUserStore.js";
import { useLocation } from "react-router";

const Layout = () => {
    const showNavbar = useUIStore((state) => state.showNavbar);
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');
    return (
        <>
            {showNavbar && <AppAppBar />}
            <Container maxWidth={isDashboard ? false : "lg"}>
                <Box >
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Layout