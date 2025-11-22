import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLocation } from "react-router";


const Layout = () => {

    const location = useLocation();
    const isProtectdPath = location.pathname.includes("dashboard") ||
        location.pathname.includes("admin")

    return (
        !isProtectdPath ?
            <Container maxWidth='xl'>
                <AppAppBar />
                <Box>
                    <Outlet />
                </Box>
            </Container> :
            <Container maxWidth={false}>
                <Box >
                    <Outlet />
                </Box>
            </Container>
    )
}

export default Layout