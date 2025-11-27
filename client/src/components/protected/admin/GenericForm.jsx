
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

import { useForm, Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography';
import { FormLabel } from '@mui/material';

export const componentMap = {
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
}


export default function GenericForm({ schema, onSubmit, defaultValues = {}, handleBack }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 20 }}>
      <Grid container spacing={2}>
        {schema.map((fieldConfig) => {
          const Component = componentMap[fieldConfig.type];
          if (!Component) return <div>Failed</div>;
          return (
            <Grid key={fieldConfig.name} size={{ xs: 12, md: 6 }}>
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                rules={{
                  required: fieldConfig.required ? `${fieldConfig.name} is required` : false
                }}
                render={({ field, fieldState }) => (
                  <Stack>
                    <Component
                      field={field}
                      fieldState={fieldState}
                      config={fieldConfig}
                    />
                    {errors[fieldConfig.name] && (
                      <Typography variant='caption' color='error'>
                        {errors[fieldConfig.name].message ?? fieldState.error.message}
                      </Typography>)
                    }
                  </Stack>
                )}
              />
            </Grid>
          )
        })}
      </Grid>

      {/* <Button type='submit'>Submit</Button> */}
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ width: 100 }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="info"
          sx={{ color: 'white', width: 100 }}
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}
