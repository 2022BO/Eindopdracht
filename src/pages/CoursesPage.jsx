import React, { useState, useEffect } from 'react';
import { CourseDetail } from '../components/CourseDetail';
import { CourseForm } from '../components/CourseForm';
import { AddIcon, ArrowUpIcon, SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import {
  Heading,
  Container,
  Box,
  Button,
  Center,
  VStack,
  Text,
  Input,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import styles from './StylePage';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false); // Add isFormOpen state

  useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('Received data:', jsonData);
        setData(jsonData);
        if (jsonData.courses) {
          setFilteredCourses(jsonData.courses);
        }
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, []);

  const handleSearch = () => {
    const newFilteredCourses = data.courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(newFilteredCourses);
    setInvalidInput(newFilteredCourses.length === 0);
  };

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterByCategory = (course) => {
    return selectedCategory === '' || course.categories.some((category) => category.id === selectedCategory);
  };

  const handleAddCourseClick = () => {
    setFormOpen(true);
    setSelectedCourse(null);
  };

  // Define handleCreateCourse to handle the creation of a new course
  const handleSaveChanges = (addCourse) => {
    // Handle the creation of the course, e.g., sending a request to the server
    // Update the state and close the form
    setFilteredCourses([...filteredCourses, addCourse]);
    setFormOpen(false);
  };

  const filteredCoursesByCategory = filteredCourses.filter(filterByCategory);

  return (
    <Center h="100%" flexDir="column" style={{ ...styles.pageContainer }}>
    <Container style={{ ...styles.container }}>
      <Box style={styles.box}>
          <Heading style={styles.heading}>Leren & Ontwikkelen in de GGZ</Heading>
          {invalidInput && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={3} style={{ padding: '10px' }}>
                Oeps!
              </AlertTitle>
              <AlertDescription>
                <strong>Wat kun je doen?</strong>
                <ul>
                  <li>Controleer de spelling van je zoekopdracht</li>
                  <li>Probeer een andere zoekopdracht</li>
                  <li>Ga naar de pagina klantenservice.</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          <VStack spacing={3} align={'stretch'} p={4}>
            <Select placeholder="Filter op categorie" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Alle categorieën</option>
              {data &&
                data.categories &&
                data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>

            <Input
              type="text"
              placeholder="Vul cursusnaam in..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button colorScheme="blue" mt={2} onClick={handleSearch}>
              Zoeken <SearchIcon ml="auto" />
            </Button>

            {filteredCoursesByCategory.map((course) => (
            <CourseDetail
              key={course.id}
              eventId={course.id}  // Pass the eventId prop
              onSelect={() => handleCourseSelection(course)}
            />
          ))}
          </VStack>

          {/* Display the selected course details */}
          {selectedCourse && (
            <Box mt={4}>
              <Heading fontSize="xl">Geselecteerde Cursus</Heading>
              <CourseDetail course={selectedCourse} />
            </Box>
          )}

<Box style={{ ...styles.box, display: 'flex', justifyContent: 'space-between' }}>
            <Button colorScheme="green" mt={2} onClick={handleAddCourseClick}>
              <Text mr={2}>Cursus toevoegen</Text>
              <AddIcon ml="auto" />
            </Button>
            {isFormOpen && (
              <CourseForm
                isOpen={isFormOpen}
                onClose={() => setFormOpen(false)}
                createCourse={handleSaveChanges} // Pass the handler function
              />
            )}
            <Button colorScheme="blue" variant="outline" mt={2} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Text mr={2}>Terug naar boven</Text>
              <ArrowUpIcon ml="auto" />
            </Button>
          </Box>
        </Box>
      </Container>
    </Center>
  );
};

export default CoursesPage;



//We would like to display a list of all courses in <coursesPage/>. Start by retrieving all the courses from the back-end using a query.

//Display the fetched courses on the users’ screen.

//Add the following details when displaying an course: title, description, image, startTime & endTime, categories

//Make an course item clickable that leads the user to a separate course page by using React Router.

//Add an “Add course” button that either opens a pop-up/modal or leads you to a new screen where you can add new courses by using a form.

//Connect the add courses feature with the back-end so that new courses get uploaded to the server as well. 

//Add a Search Function. We want a way for users to search for specific courses on the page that displays all the courses.

//Add a Filter Function. We need a feature that lets users filter the displayed results based on different categories.

//The page shows a list of all events that are retrieved from the back-end server with the following details: title, description, image, startTime, endTime and categories.
//The user can click on an event that leads them to the ‘Event’ page using React Router.
//There is a button that allows the user to add new events using a form. 
//A query to add the event to the server is sent as well.
//You can search through the events based on the name of the event.
//You can filter through the list/search results based on categories.