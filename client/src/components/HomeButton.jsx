import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';

const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <IconButton aria-label='home-button' size='small' onClick={() => navigate('/')}>
            <HomeIcon />
        </IconButton>
    )
}

export default HomeButton