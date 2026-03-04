import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addModule } from '../store/moduleSlice';
import { fetchCourses } from '../store/courseSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const schema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z
    .string()
    .min(5, 'Описание должно содержать минимум 5 символов'),
  courseId: z.number({
    required_error: 'Выберите курс',
    invalid_type_error: 'Выберите курс',
  }),
});

export default function CreateModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.list);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addModule(data)).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => navigate('/'), 1500);
    });
  };

  return (
    <Container maxWidth='sm'>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant='h4'>Создать модуль</Typography>

        <FormControl fullWidth error={!!errors.courseId}>
          <InputLabel id='course-select-label'>Курс</InputLabel>
          <Select
            labelId='course-select-label'
            label='Курс'
            {...register('courseId', { valueAsNumber: true })}
          >
            <MenuItem value=''>
              <em>Выберите курс</em>
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
          {errors.courseId && (
            <Typography color='error' variant='caption'>
              {errors.courseId.message}
            </Typography>
          )}
        </FormControl>

        <TextField
          label='Название модуля'
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <TextField
          label='Описание модуля'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          rows={3}
        />

        <Button type='submit' variant='contained' size='large'>
          Создать модуль
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity='success' onClose={() => setSnackbarOpen(false)}>
          Модуль успешно создан!
        </Alert>
      </Snackbar>
    </Container>
  );
}
