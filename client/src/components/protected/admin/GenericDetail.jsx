import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Box, Grid, Paper, Typography, CircularProgress, Alert, Divider, Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AdminPageContainer from './AdminPageContainer.jsx';

const GenericDetail = ({ resource, fields }) => {

    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [resource.name, id],
        queryFn: () => resource.getOne(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/admin/${resource.path}`);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    m: 1,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (isError) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Alert severity="error">{error.message}</Alert>
            </Box>
        );
    }

    const item = data?.item;

    return (
        <AdminPageContainer
            title={`${resource.title} #${Object.values(item)[1]}`}
            breadcrumbs={[
                { title: `${resource.title}s`, path: `/admin/${resource.path}` },
                { title: `Detail` },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {fields.map((field, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <Paper sx={{ px: 2, py: 1 }}>
                                    <Typography variant="caption">{field.title}</Typography>
                                    <Typography variant="body1" sx={{ my: 1, ml: 1 }}>
                                        {item[field.name]}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="info"
                                sx={{ width: 100, height: 40, color: 'white' }}
                                startIcon={<EditIcon />}
                            // onClick={handleEmployeeEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ width: 100, height: 42 }}
                                startIcon={<DeleteIcon />}
                            // onClick={handleEmployeeDelete}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </AdminPageContainer>
    )
}

export default GenericDetail