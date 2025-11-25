import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLocation } from "react-router";
import { useLayoutEffect, useState } from "react";


const Layout = () => {

    const location = useLocation();
    const [protectedPath, setProtectedPath] = useState(false);

    useLayoutEffect(() => { // prevent screen flickering when refreshing page
        const isProtected = location.pathname.includes("dashboard") || location.pathname.includes("admin")
        setProtectedPath(isProtected)
    }, [location.pathname]);

    return (
        <Container maxWidth={`${protectedPath ? false : 'xl'}`}>
            {!protectedPath && <AppAppBar />}
            <Box>
                <Outlet />
            </Box>
        </Container>
    )
}

export default Layout