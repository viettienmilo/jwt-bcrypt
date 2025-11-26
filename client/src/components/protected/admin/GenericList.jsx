import { useMemo, useState, useCallback } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate, useSearchParams, useLocation } from "react-router";
import { useDialogs } from './../../../hooks/admin/useDialogs/useDialogs.jsx';
// import useNotifications from "../hooks/useNotifications/useNotifications";
import AdminPageContainer from './AdminPageContainer.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const INITIAL_PAGE_SIZE = 10;

export default function GenericList({
    title,
    columns,
    getMany,
    deleteOne,
    basePath, // "/courses", "/students", etc.
    noCreate = false
}) {
    const navigate = useNavigate();
    const dialogs = useDialogs();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    // PAGINATION
    const [paginationModel, setPaginationModel] = useState({
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
        pageSize: searchParams.get('pageSize')
            ? Number(searchParams.get('pageSize'))
            : INITIAL_PAGE_SIZE,
    });

    // SORT
    const [sortModel, setSortModel] = useState(
        searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
    );

    // FILTER
    const [filterModel, setFilterModel] = useState(
        searchParams.get('filter')
            ? JSON.parse(searchParams.get('filter') ?? '')
            : { items: [] },
    );

    // FETCH MANY
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [basePath, paginationModel, sortModel, filterModel],
        queryFn: () => getMany({ paginationModel, sortModel, filterModel }),
        keepPreviousData: true,
    });

    const rows = data?.items ?? [];
    const rowCount = data?.itemCount ?? 0;

    // DELETE ONE (MUTATION)
    const deleteMutation = useMutation({
        mutationFn: deleteOne,
        onSuccess: () => queryClient.invalidateQueries([basePath]),
    });

    // ROW ACTIONS: VIEW/EDIT/DELETE/CREATE
    const handleRowClick = useCallback(
        ({ row }) => {
            navigate(`/admin/${basePath}/${row._id}`);
        },
        [navigate],
    );
    const handleRowEdit = row => () => navigate(`/admin/${basePath}/${row._id}/edit`);

    const handleRowDelete = row => async () => {
        const confirmed = await dialogs.confirm(`Delete ${row._id}?`, {
            title: "Delete item?",
            severity: "error",
            okText: "Delete",
            cancelText: "Cancel",
        });

        document.activeElement?.blur();  // no warning aria-label-hidden when control still has focus

        if (confirmed) {
            deleteMutation.mutate(row._id);
        }
    };

    const handleCreateClick = () => navigate(`/admin/${basePath}/new`);

    // REFRESH
    const handleRefresh = () => refetch();

    // ACTION COLUMNS (EDIT/DELETE)
    const finalColumns = useMemo(() => [
        ...columns,
        {
            field: "actions",
            type: "actions",
            flex: 1,
            align: "right",
            getActions: ({ row }) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={handleRowEdit(row)}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon color="error" />}
                    label="Delete"
                    onClick={handleRowDelete(row)}
                />,
            ],
        },
    ],
        [handleRowEdit, handleRowDelete]
    );

    return (
        <AdminPageContainer
            title={`All ${title}`}
            breadcrumbs={[{ title }]}
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title={`Reload ${title}`}>
                        <IconButton onClick={handleRefresh} size="small">
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant={noCreate ? "outlined" : "contained"}
                        size="small"
                        // color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleCreateClick}
                        disabled={noCreate}
                    >
                        Create
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ height: 600, width: "100%" }}>
                {error ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Alert severity="error">{error.message}</Alert>
                    </Box>
                ) : (
                    <DataGrid
                        rows={rows}
                        rowCount={rowCount}
                        getRowId={(row) => row._id}
                        columns={finalColumns}
                        loading={isLoading}
                        pagination
                        paginationMode="server"
                        sortingMode="server"
                        filterMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        sortModel={sortModel}
                        onSortModelChange={setSortModel}
                        filterModel={filterModel}
                        onFilterModelChange={setFilterModel}
                        disableRowSelectionOnClick
                        showToolbar
                        pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                                outline: 'transparent',
                            },
                            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                            {
                                outline: 'none',
                            },
                            [`& .${gridClasses.row}:hover`]: {
                                cursor: 'pointer',
                            },
                            '.MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                                color: 'text.secondary',
                            },
                        }}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'circular-progress',
                                noRowsVariant: 'circular-progress',
                            },
                            baseIconButton: {
                                size: 'small',
                            },
                        }}
                        onRowClick={handleRowClick}
                        disableColumnFilter
                    />
                )}
            </Box>
        </AdminPageContainer>
    );
}