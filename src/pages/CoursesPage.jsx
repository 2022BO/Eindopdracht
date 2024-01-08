import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation'; 
import AddCourse from './AddCourse';
import { CourseDetail } from '../components/CourseDetail';
import { AddIcon, ArrowUpIcon, SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import styles from './StylePage';
import { useToast } from '@chakra-ui/react';
import {
  Heading,
  Flex,
  Wrap,
  WrapItem,
  Box,
  Button,
  Center,
  VStack,
  HStack,
  Text,
  Input,
  Image,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';



  const CoursesPage =({courseId}) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [data, setData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState ([]);
  const toast = useToast();

  
  useEffect(() => {
    if (data && data.courses) {
      // Schoonmaken van categorieën
      const cleanedCourses = data.courses.map(course => ({
        ...course,
        categories: course.categories.map(category => category.replace(/"/g, '').trim())
      }));
  
      setCourses(cleanedCourses);
    }
    if (data && data.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('Received data:', jsonData);
        setData(jsonData);
        setFilteredCourses(jsonData.courses || []);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, []);

  const availableCourses = (course) => {
    // Filter op categorieën
    const matchesCategory = !selectedCategory || course.categories.includes(selectedCategory);
  
    // Filter op zoekopdracht
    const matchesSearch = availableCourses.filter((course)=>{
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    }
    );   
  
    // Zorg ervoor dat zowel categorieën als zoekopdracht overeenkomen
    return matchesCategory && matchesSearch;
  };
 
  const handleSearch = () => {
    console.log('Courses Categories:', courses.map(course => course.categories));
    setFilteredCourses(courses);

    const newFilteredCourses = filteredCourses.filter((course) => {
      console.log('Course:', course);
  
      const matchesCategory =
        selectedCategory === '' ||
        course.categories.some(
          (category) => category.toLowerCase() === selectedCategory.toLowerCase()
        );
  
        const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.categories.some(category =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        );
 
      return matchesCategory && matchesSearch;

    });
    console.log('Filtered Courses:', newFilteredCourses);
    setFilteredCourses(newFilteredCourses);
    setInvalidInput(newFilteredCourses.length === 0);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCourseSelection = (course) => {
    try {
      setSelectedCourse(course);
    } catch (error) {
      console.error('Error selecting course:', error);
    }
  };
  const filterByCategory = (course) => {
    return (
      selectedCategoryId === '' ||
      course.categories.some((category) => category === selectedCategoryId)
    );
  };

  const handleAddCourseClick = () => {
    navigate('/add-course-form');
    setFormOpen(true);
    setSelectedCourse(null);
  };

  const handleUpdateCourses = (newCourse) => {
    // Voeg de nieuwe cursus toe aan de lijst met cursussen of voer andere logica uit om de cursus bij te werken
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    setNotification("Cursus succesvol toegevoegd/verwijderd");
  };

  const handleDeleteCourse = async (courseId) => {
    const isConfirmed = window.confirm("Weet je 100% zeker dat je deze cursus wilt verwijderen?");
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Verwijder de cursus uit de lijst
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
        setSelectedCourse(null);
        handleShowNotification("Cursus succesvol verwijderd", "success");
        navigate('/');
      } else {
        console.error('Failed to delete course. Server returned:', response);
        handleShowNotification("Fout bij het verwijderen van de cursus", "error");
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      handleShowNotification("Fout bij het verwijderen van de cursus", "error");
    }
  };
  const handleShowNotification = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };
  
  const filteredCoursesByCategory = filteredCourses.filter(filterByCategory);
  return (
    <Center h="100%" flexDir="column" style={{ ...styles.pageContainer }}>
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
          <Select
  placeholder="Filter op categorie"
  value={selectedCategory}
  onChange={handleCategoryChange}
>
  <option value="">Alle categorieën</option>
  {data &&
    data.categories &&
    data.categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
</Select>
    <Input
      type="text"
      placeholder="Vul cursusnaam in..."
      value={searchQuery}
      onChange={(e) => {
        console.log('Input Change Event:', e.target.value);
        setSearchQuery(e.target.value)}
      }
    />
  <Button colorScheme="blue" mt={2} onClick={handleSearch}>
    Zoeken <SearchIcon ml="auto" />
  </Button>
  <Flex
            wrap="wrap"
            justify="space-between"
            align="stretch"
            spacing={4}
            direction={{ base: 'column', md: 'row' }}
          >
            {filteredCoursesByCategory.map((course) => (
            <Box  key={course.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding={3}
            mt={2}
            width={{ base: '100%', md: '30%' }}
            mx={{ base: 0, md: 3 }}
             >
                  <img src={course.image} alt={course.title} style={styles.image} 
                  />
                  <Text as="h3" fontSize="lg" fontWeight="bold" color="blue.500" mb={2}>
                    {course.title}
                  </Text>
                  <Text>
                    <strong>Omschrijving:</strong> {course.description || "Informatie niet beschikbaar"}
                  </Text>
                  <Text>
                    <strong>Starttijd:</strong> {course.startTime || "Informatie niet beschikbaar"}
                  </Text>
                  <Text>
                    <strong>Eindtijd:</strong> {course.endTime || "Informatie niet beschikbaar"}
                  </Text>
                  <Text>
                    <strong>Categorieën:</strong> {course.categories ? course.categories.join(', ') : 'N/A'}
                  </Text>
                  <Text>
                  <strong>Docent:</strong> {course.instructor?.name || "Informatie niet beschikbaar"}
    </Text>
    {course.instructor?.image && (
  <Image
    boxSize="50px"  // Set the desired size
    src={course.instructor?.image}
    alt={course.instructor?.name}
    style={styles.imageInstrutor}
  />
  
)}

                {course.id === selectedCourse?.id ? (
                  <CourseDetail key={course.id} courseId={course.id} /> 
                ) : (
                  <>
                    <CourseDetail key={course.id} courseId={course.id} onSelect={() => handleCourseSelection(course)} />
                   <Link to={`/course/${course.id}`}>
                   <Button colorScheme="blue" variant="outline" ml={2} mt={2} mb={2}>
                     Selecteer
                    </Button>
                     </Link>
                     <Button colorScheme="red" variant="outline" ml={2} mt={2} mb={2} onClick={() => handleDeleteCourse(course.id)}>
                      Verwijder
                    </Button>
                  </>
                )}
              </Box>
            ))}
            </Flex>
          </VStack>
         
          {/* Display the selected course details */}
          {selectedCourse && (
            <Box mt={4}>
              <Heading fontSize="xl">Geselecteerde Cursus</Heading>
              <CourseDetail course={selectedCourse} />
            </Box>
          )}

  <Navigation setFormOpen={setFormOpen} handleAddCourseClick={handleAddCourseClick}/>
<Box style={{ ...styles.box, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-start' }}>
  <Button colorScheme="blue" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <Text mr={2}>Terug naar boven</Text>
    <ArrowUpIcon ml="auto" />
  </Button>
</Box>
        </Box>
        {isFormOpen && (
          <AddCourse
           isOpen={isFormOpen}
           onClose={() => setFormOpen(false)}
           handleUpdateCourses={handleUpdateCourses} 
           handleAddCourseClick={handleAddCourseClick}  />

        )}
    
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

