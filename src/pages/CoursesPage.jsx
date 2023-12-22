import { useState, useEffect } from 'react';
import CourseDetail from '../components/CourseDetail';
import {
  Heading,
  List,
  ListItem,
  Container,
  Box,
  Button,
  Center,
  VStack,
  Text,
  Input,
  Link,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import styles from './StylePage';


const CoursesPage = ({ setSelectedCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('Received data:', jsonData);
        setData(jsonData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, []);

  const handleSaveChanges = () => {
    alert('Changes saved!');
    console.log('Save changes clicked');
  };

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterByCategory = (course) => {
    return selectedCategory === '' || course.categories.includes(selectedCategory);
  };

  const filteredCoursesByCategory = filteredCourses.filter(filterByCategory);

  return (
    <Center h='100%' flexDir='column' style={{ ...styles.pageContainer }}>
      <Container style={{ ...styles.container, background: 'linear-gradient(to right, #3498db, #2ecc71)' }}>
        <Box style={styles.box}>
          <Heading style={styles.heading}>Leren & Ontwikkelen in de GGZ</Heading>
          {invalidInput && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={3} style={{ padding: '10px' }}>Oeps!</AlertTitle>
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
          <VStack spacing={4} align={'stretch'} p={4}>
            <Select
              placeholder="Filter op categorie"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Alle categorieën</option>
              {data &&
                data.categories &&
                data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>
            {filteredCoursesByCategory.map((course) => (
  <CourseDetail
    key={course.id}
    course={course}
    onSelect={() => handleCourseSelection(course)}
  />
            ))}
          </VStack>
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button colorScheme="blue" mt={2} onClick={handleSaveChanges}>
            Search
          </Button>
          <Link to="/add-course">
            <Button colorScheme='green' mt={2}>
              Add Course
            </Button>
            <Button colorScheme="blue" mt={2} onClick={handleSaveChanges}>
          Save Changes
        </Button>
          </Link>
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