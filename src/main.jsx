// main.jsx
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AddCourse  from './pages/AddCourse';
import { EventPage } from './pages/EventPage'; 
import { CoursesPage } from './pages/CoursesPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <CoursesPage />,
        // loader: postListLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
      {
        path: '/add-course',
        element: <AddCourse />,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
