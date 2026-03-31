import axios from 'axios';

const API_URL = '[https://my-json-server.typicode.com/kotymurk/course-app](https://my-json-server.typicode.com/kotymurk/course-app)';

export const api = {
  getCourses: () => axios.get(`${API_URL}/courses`),
  createCourse: (data) => axios.post(`${API_URL}/courses`, data),
  getModules: () => axios.get(`${API_URL}/modules`),
  createModule: (data) => axios.post(`${API_URL}/modules`, data),
};
