// GenericList.jsx
import * as React from "react";
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

import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDialogs } from './../../../hooks/admin/useDialogs/useDialogs.jsx';
// import useNotifications from "../hooks/useNotifications/useNotifications";
import AdminPageContainer from './AdminPageContainer.jsx';

const INITIAL_PAGE_SIZE = 10;

export default function GenericList({
    title,
    columns,
    getMany,
    deleteOne,
    basePath, // "/employees", "/students", "/courses"
}) {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const dialogs = useDialogs();
    // const notifications = useNotifications();

    // State
    const [paginationModel, setPaginationModel] = React.useState({
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
        pageSize: searchParams.get("pageSize")
            ? Number(searchParams.get("pageSize"))
            : INITIAL_PAGE_SIZE,
    });

    const [filterModel, setFilterModel] = React.useState(
        searchParams.get("filter")
            ? JSON.parse(searchParams.get("filter") ?? "")
            : { items: [] }
    );

    const [sortModel, setSortModel] = React.useState(
        searchParams.get("sort") ? JSON.parse(searchParams.get("sort") ?? "") : []
    );

    const [rowsState, setRowsState] = React.useState({
        rows: [],
        rowCount: 0,
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // --- URL sync ---
    const sync = (key, value) => {
        if (value) searchParams.set(key, value);
        else searchParams.delete(key);
        const str = searchParams.toString();
        navigate(`${pathname}${str ? "?" : ""}${str}`);
    };

    // --- handlers ---
    const handlePaginationModelChange = (model) => {
        setPaginationModel(model);
        sync("page", model.page);
        sync("pageSize", model.pageSize);
    };

    const handleFilterModelChange = (model) => {
        setFilterModel(model);
        sync(
            "filter",
            model.items.length > 0 ||
                (model.quickFilterValues && model.quickFilterValues.length > 0)
                ? JSON.stringify(model)
                : null
        );
    };

    const handleSortModelChange = (model) => {
        setSortModel(model);
        sync("sort", model.length > 0 ? JSON.stringify(model) : null);
    };

    // --- load data ---
    const loadData = React.useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            const res = await getMany({ paginationModel, sortModel, filterModel });
            setRowsState({
                rows: res.items,
                rowCount: res.itemCount,
            });
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    }, [paginationModel, sortModel, filterModel, getMany]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRefresh = () => {
        if (!isLoading) loadData();
    };

    const handleRowClick = ({ row }) => navigate(`${basePath}/${row.id}`);
    const handleCreateClick = () => navigate(`${basePath}/new`);
    const handleRowEdit = (row) => () => navigate(`${basePath}/${row.id}/edit`);

    const handleRowDelete = (row) => async () => {
        const confirmed = await dialogs.confirm(`Delete ${row.id}?`, {
            title: `Delete item?`,
            severity: "error",
            okText: "Delete",
            cancelText: "Cancel",
        });

        if (confirmed) {
            setIsLoading(true);
            try {
                await deleteOne(Number(row.id));
                // notifications.show("Deleted successfully.", {
                //     severity: "success",
                // });
                loadData();
            } catch (err) {
                console.log(err.message)
                // notifications.show(`Delete failed: ${err.message}`, {
                //     severity: "error",
                // });
            }
            setIsLoading(false);
        }
    };

    // Add "actions" column automatically
    const finalColumns = React.useMemo(
        () => [
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
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleRowDelete(row)}
                    />,
                ],
            },
        ],
        [columns]
    );

    return (
        <AdminPageContainer
            title={title}
            breadcrumbs={[{ title }]}
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title="Reload data" placement="right">
                        <IconButton onClick={handleRefresh} size="small">
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Button variant="contained" onClick={handleCreateClick} startIcon={<AddIcon />}>
                        Create
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ flex: 1, width: "100%" }}>
                {error ? (
                    // <Alert severity="error">{error.message}</Alert>
                    console.log(error.message)
                ) : (
                    <DataGrid
                        rows={rowsState.rows}
                        rowCount={rowsState.rowCount}
                        columns={finalColumns}
                        loading={isLoading}
                        pagination
                        sortingMode="server"
                        filterMode="server"
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        sortModel={sortModel}
                        onSortModelChange={handleSortModelChange}
                        filterModel={filterModel}
                        onFilterModelChange={handleFilterModelChange}
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                                outline: "transparent",
                            },
                            [`& .${gridClasses.row}:hover`]: {
                                cursor: "pointer",
                            },
                        }}
                    />
                )}
            </Box>
        </AdminPageContainer>
    );
}
