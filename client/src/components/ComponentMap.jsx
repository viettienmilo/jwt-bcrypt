import { ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';

import Typography from '@mui/material/Typography';

export const ComponentMap = {
    text: ({ field, config }) => (
        <FormControl>
            <Typography
                htmlFor={`${config.name}`}
                component='label'
                variant='caption'
                sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
            >
                {config.label}
            </Typography>
            <TextField
                {...field}
                value={field.value ?? ""}
                disabled={config.disabled}
                placeholder={config.placeholder}
                fullWidth
            />
        </FormControl>
    ),

    number: ({ field, config }) => (
        <FormControl>
            <Typography
                htmlFor={`${config.name}`}
                component='label'
                variant='caption'
                sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
            >
                {config.label}
            </Typography>
            <TextField
                {...field}
                type='number'
                value={field.value ?? ""}
                disabled={config.disabled}
                fullWidth
            />
        </FormControl>
    ),

    select: ({ field, config }) => (
        <FormControl fullWidth>
            <Typography
                htmlFor={`${config.name}`}
                component='label'
                variant='caption'
                sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
            >
                {config.label}
            </Typography>
            <TextField
                {...field}
                select
                value={field.value ?? ""}
                disabled={config.disabled}
            >
                {config.options.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    ),

    checkbox: ({ field, config }) => (
        <FormControlLabel
            control={
                <Checkbox
                    {...field}
                    checked={!!field.value}
                />
            }
            label={config.label}
        />
    ),

    date: ({ field, fieldState, config }) => (
        <FormControl fullWidth>
            <Typography
                htmlFor={`${config.name}`}
                component='label'
                variant='caption'
                sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
            >
                {config.label}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{
                        '& .MuiButtonBase-root': {
                            height: '30px',
                            width: '30px',
                        },
                        '& .MuiInputBase-root': {
                            height: '32px',
                            width: '32px'
                        },
                        '& .MuiPickersSectionList-root': {
                            py: 1.2,
                        },
                    }}
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                    slotProps={{
                        textField: {
                            error: !!fieldState.error,
                            helperText:
                                fieldState.error?.message,
                        },
                    }}
                    disabled={config.disabled}
                />
            </LocalizationProvider>
        </FormControl>
    ),

    multiselect: ({ field, config }) => (
        <FormControl fullWidth>
            <Typography
                htmlFor={`${config.name}`}
                component='label'
                variant='caption'
                sx={{ display: "block", mb: 0.5, color: 'text.secondary' }}
            >
                {config.label}
            </Typography>
            <TextField
                {...field}
                select
                slotProps={{
                    select: {
                        multiple: true,
                        renderValue: (selected) => selected.join(", "),
                        MenuProps: {
                            disableAutoFocusItem: true,  // <-- disable first item auto-focus
                            PaperProps: {
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        minHeight: 28,
                                        // py: 0.5,
                                        mb: 0.5,
                                    }
                                }
                            }
                        },
                    }
                }}
                value={field.value ?? []}
                disabled={config.disabled}
            >
                {config.options.map(opt => (
                    <MenuItem key={opt} value={opt} gap={1}>
                        <Checkbox checked={field.value ? field.value.includes(opt) : false} />
                        <ListItemText primary={opt} />
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    ),
}

export default ComponentMap;