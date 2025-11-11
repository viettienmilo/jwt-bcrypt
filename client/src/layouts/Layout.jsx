import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Layout = () => {
    return (
        <>
            <AppAppBar />
            <Container maxWidth="lg">
                <Box >
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Layout