import GenericForm from './GenericForm.jsx';
import { useMutation } from '@tanstack/react-query'
import AdminPageContainer from './AdminPageContainer.jsx';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function GenericCreate({ title, schema, createOne, breadcrums }) {

    const { enqueueSnackbar } = useSnackbar();

    const createMutation = useMutation({
        mutationFn: (data) => createOne(data),
        onSuccess: () => enqueueSnackbar(`${title} have been created successfully.`, { variant: 'success' }),
        onError: () => enqueueSnackbar(`${title} created failed.`, { variant: 'error' }),
    });

    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        createMutation.mutate(formData);
    };

    const handleBack = () => {
        navigate(breadcrums.path)
    }

    return (
        <AdminPageContainer
            title={title}
            breadcrumbs={[{ title: `${breadcrums.title}`, path: `${breadcrums.path}` }, { title: 'New' }]}
        >
            <GenericForm
                schema={schema}
                onSubmit={handleSubmit}
                handleBack={handleBack}
            />
        </AdminPageContainer>
    )
}