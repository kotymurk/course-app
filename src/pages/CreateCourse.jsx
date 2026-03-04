import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { addCourse } from '../store/courseSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

const schema = z.object({
  title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z
    .string()
    .min(5, 'Описание должно содержать минимум 5 символов'),
  imageUrl: z
    .string()
    .url('Введите корректный URL')
    .optional()
    .or(z.literal('')),
  category: z.string().min(3, 'Категория должна содержать минимум 3 символа'),
});

export default function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addCourse(data)).then(() => {
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
        <Typography variant='h4'>Создать курс</Typography>

        <TextField
          label='Название'
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <TextField
          label='Описание'
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          label='URL изображения'
          {...register('imageUrl')}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          fullWidth
        />

        <TextField
          label='Категория'
          {...register('category')}
          error={!!errors.category}
          helperText={errors.category?.message}
          fullWidth
        />

        <Button type='submit' variant='contained' size='large'>
          Создать курс
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity='success' onClose={() => setSnackbarOpen(false)}>
          Курс успешно создан!
        </Alert>
      </Snackbar>
    </Container>
  );
}
