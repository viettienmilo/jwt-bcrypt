import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useUIStore } from "../store/useUserStore.js";
import { useLocation } from "react-router";
import { useEffect } from "react";

const Layout = () => {
    const showNavbar = useUIStore(state => state.showNavbar);
    const setShowNavbar = useUIStore(state => state.setShowNavbar);
    const location = useLocation();

    // hide Navbar when enter dashboard and restore it when going back
    // useEffect helps restore Navbar when user uses Back button of the browser
    useEffect(() => {
        const isDashboard = location.pathname.includes('/dashboard');
        if (isDashboard) {
            // Move focus away before hiding navbar
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
        setShowNavbar(!isDashboard);
    }, [location])

    return (
        <>
            {showNavbar && <AppAppBar />}
            <Container maxWidth={showNavbar ? "lg" : false}>
                <Box >
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Layout