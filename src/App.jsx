import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import CreateCourse from './pages/CreateCourse';
import CreateModule from './pages/CreateModule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CourseList />} />
        <Route path='/:courseId' element={<CourseDetail />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/create-module' element={<CreateModule />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
