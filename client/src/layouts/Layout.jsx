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

    const hideNavbarPaths = [
        '/user/dashboard',
        'auth/google/callback',
        'auth/facebook/callback',
    ];

    // hide Navbar when enter dashboard and restore it when going back
    // useEffect helps restore Navbar when user uses Back button of the browser
    useEffect(() => {
        const shouldHide = hideNavbarPaths.some(path => location.pathname.startsWith(path));
        setShowNavbar(!shouldHide);
    }, [location.pathname])

    return (
        <>
            <Container
                maxWidth={showNavbar ? "lg" : "xl"}
            >
                {showNavbar && <AppAppBar />}
                <Box >
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Layout