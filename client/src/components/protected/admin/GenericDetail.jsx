import { Box, Grid, Paper, Typography, CircularProgress, Alert, Divider, Stack, Button, Card, CardHeader, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import AdminPageContainer from './AdminPageContainer.jsx';
import { useDialogs } from './../../../hooks/admin/useDialogs/useDialogs.jsx';

// use for mapping breadcrumbs path
const resourceListPath = {
    courses: '/admin',       // default route is /admin
    users: '/admin/users',
    students: '/admin/students',
    classes: '/admin/classes',
    grades: '/admin/grades',
    settings: '/admin/settings',
};

const GenericDetail = ({ resource, fields }) => {

    const { id } = useParams();
    const dialogs = useDialogs();
    // const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [deleted, setDeleted] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [resource.name, id],
        queryFn: () => resource.getOne(id),
        enabled: !!id,
    });

    const deleteMutation = useMutation({
        mutationFn: resource.deleteOne,
        onSuccess: async () => {
            setDeleted(true);
        }
    });

    // prevent react reload deleted document
    useEffect(() => {
        if (deleted) navigate('../')
    }, [deleted, navigate])

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = useCallback(() => {
        navigate(`/admin/${resource.path}/${id}/edit`);
    }, [navigate, id]);

    const handleDelete = async () => {
        const confirmed = await dialogs.confirm(`Delete ${id}?`, {
            title: "Delete item?",
            severity: "error",
            okText: "Delete",
            cancelText: "Cancel",
        });

        // no warning aria-label-hidden when control still has focus
        document.activeElement?.blur();

        if (confirmed) {
            deleteMutation.mutate(id);
        }
    }

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
            title={`${resource.title} #${item._id}`}      //${Object.values(item)[1]}
            breadcrumbs={[
                { title: `${resource.title}${resource.title.slice(-1) === 's' ? 'es' : 's'}`, path: resourceListPath[resource.path] },
                { title: `Detail` },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {fields.map((field, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <Paper sx={{ px: 2, py: 1 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
                                    >
                                        {field.title}
                                    </Typography>
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
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ width: 100, height: 42 }}
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
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