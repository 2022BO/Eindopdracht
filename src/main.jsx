// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import CoursesPage from './pages/CoursesPage'; 
import { EventPage } from './pages/EventPage';
import { CourseForm } from './components/CourseForm';
import ErrorBoundary from './pages/ErrorBoundry';
import AddCourse from './pages/AddCourse';




const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <ErrorBoundary><CoursesPage /></ErrorBoundary>,
      },
      {
        path: '/event/:eventId',
        element: <ErrorBoundary><EventPage /></ErrorBoundary>,
      },
      {
        path: '/add-course',
        element: <ErrorBoundary><AddCourse/></ErrorBoundary>,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraProvider>
);
