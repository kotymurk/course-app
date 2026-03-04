import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../store/courseSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
  CardMedia,
} from '@mui/material';

export default function CourseList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Typography variant='h4'>Список курсов</Typography>
        <Box>
          <Button
            variant='contained'
            component={Link}
            to='/create-course'
            sx={{ mr: 1 }}
          >
            Создать курс
          </Button>
          <Button variant='outlined' component={Link} to='/create-module'>
            Создать модуль
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {list.map((course) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <Card
              component={Link}
              to={`/${course.id}`}
              sx={{ textDecoration: 'none', height: '100%' }}
            >
              <CardMedia
                component='img'
                height='200'
                image={course.imageUrl}
                alt={course.title}
              />
              <CardContent>
                <Typography variant='h6' color='primary' gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  {course.description}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {course.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
