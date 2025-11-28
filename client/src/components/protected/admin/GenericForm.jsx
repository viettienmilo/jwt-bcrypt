import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useForm, Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography';

import ComponentMap from './../../ComponentMap.jsx';

export default function GenericForm(
  {
    schema,
    onSubmit,
    defaultValues = {},
    handleBack }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 20 }}>
      <Grid container spacing={2}>
        {schema.map((fieldConfig) => {
          const Component = ComponentMap[fieldConfig.type];
          if (!Component) return <div>Failed</div>;
          return (
            <Grid key={fieldConfig.name} size={{ xs: 12, md: 6 }}>
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                rules={{
                  required: fieldConfig.required ? `${fieldConfig.name} is required` : false,
                  pattern: fieldConfig.pattern ? {
                    value: fieldConfig.pattern,
                    message: `${fieldConfig.label} is invalid format`
                  } : undefined
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
