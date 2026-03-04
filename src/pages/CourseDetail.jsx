import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModules } from '../store/moduleSlice';
import { fetchCourses } from '../store/courseSlice';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
  Button,
  CardMedia,
} from '@mui/material';

export default function CourseDetail() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { list: allModules, loading: modulesLoading } = useSelector((state) => state.modules);
  const { list: courses, loading: coursesLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchModules());
    dispatch(fetchCourses());
  }, [dispatch]);

  
  const courseIdNum = Number(courseId);
  const course = courses.find((c) => c.id === courseIdNum);
  const modules = allModules.filter((m) => m.courseId === courseIdNum);

  if (coursesLoading || modulesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Container>
        <Typography variant="h5">Курс не найден</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>
          На главную
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button component={Link} to="/" sx={{ mb: 2 }}>
        ← Назад к списку
      </Button>

      <Typography variant="h3" gutterBottom>
        {course.title}
      </Typography>

      {course.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={course.imageUrl}
          alt={course.title}
          sx={{ mb: 2, borderRadius: 1 }}
        />
      )}

      <Typography variant="body1" paragraph>
        {course.description}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Категория: {course.category}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Модули курса:
      </Typography>

      {modules.length > 0 ? (
        <List>
          {modules.map((mod) => (
            <ListItem key={mod.id} divider>
              <ListItemText
                primary={mod.title}
                secondary={mod.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          В этом курсе пока нет модулей
        </Typography>
      )}
    </Container>
  );
}