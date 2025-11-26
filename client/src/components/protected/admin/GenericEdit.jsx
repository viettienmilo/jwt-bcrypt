import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';

import AdminPageContainer from './AdminPageContainer.jsx';
import GenericForm from './GenericForm.jsx';

export default function GenericEdit({ title, schema, updateOne, breadcrums, defaultValues = {}, invalidateKey }) {

    const { id } = useParams();

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const queryClient = useQueryClient();   // update cache

    const editMutation = useMutation({
        mutationFn: ({ id, data }) => updateOne({ id, data }),
        onSuccess: () => {
            queryClient.invalidateQueries([invalidateKey, id]); // update new data to cache
            enqueueSnackbar(`${title} have been updated successfully.`, { variant: 'success' })
        },
        onError: () => enqueueSnackbar(`${title} editing failed.`, { variant: 'error' }),
    });

    const handleSubmit = (formData) => {
        editMutation.mutate({ id, data: formData });
    };

    const handleBack = () => {
        // navigate(breadcrums.path);
        navigate(-1);
    }

    return (
        <AdminPageContainer
            title={`${title}`}
            breadcrumbs={[{ title: `${breadcrums.title}`, path: `${breadcrums.path}` }, { title: 'Edit' }]}
        >
            <GenericForm
                schema={schema}
                onSubmit={handleSubmit}
                handleBack={handleBack}
                defaultValues={defaultValues}
            />
        </AdminPageContainer>
    )
}