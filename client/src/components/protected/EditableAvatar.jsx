import { Box, Avatar, IconButton, CircularProgress } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState } from 'react';
import useImageUpload from './../../hooks/user/useImageUpload.js';
import { useUserStore } from '../../store/useUserStore.js';
import { useSnackbar } from 'notistack';

const EditableAvatar = ({ user }) => {
    const setUser = useUserStore(state => state.setUser);

    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef(null);
    const { mutate, isPending } = useImageUpload();
    const { enqueueSnackbar } = useSnackbar();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatarUrl', file);
        formData.append('userId', user._id);

        mutate(formData, {
            onSuccess: (data) => {
                enqueueSnackbar("Image uploaded successfully", { variant: 'success' });
                setUser({ ...user, profilePicture: data.data.avatarUrl });
            },
            onError: () => {
                enqueueSnackbar("Uploading failed", { variant: 'error' });
            },
        })
    }

    return (
        <Box
            sx={{
                display: 'inline-block',
                position: 'relative',
                flexDirection: 'column',
                width: 150,
                height: 150,
                gap: 2,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Avatar
                sx={{
                    width: 150,
                    height: 150,
                    alignSelf: 'center',
                }}
                src={user.avatarUrl || undefined}
                alt={user.username}
            />

            {/* Spinner overlay */}
            {isPending && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {/* Edit button (pen icon) */}
            {!isPending && isHovered && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                    }}
                >
                    <IconButton aria-label="edit" size='small'
                        onClick={() => inputRef.current.click()}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            )}
            <input
                type='file'
                ref={inputRef}
                accept='image/*'
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </Box>
    )
}

export default EditableAvatar