import { Outlet } from "react-router"
import AppAppBar from './../components/AppAppBar.jsx';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useUIStore } from "../store/useUserStore.js";

const Layout = () => {
    const showNavbar = useUIStore((state) => state.showNavbar);
    return (
        <>
            {showNavbar && <AppAppBar />}
            <Container maxWidth="lg">
                <Box >
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Layout