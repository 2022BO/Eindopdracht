import { useEffect, useState, useRef } from 'react';
import { Box, Image, VStack, Text, HStack} from '@chakra-ui/react';
import styles from '../pages/StylePage';
import { TimeIcon } from '@chakra-ui/icons';
import { Link, useParams } from 'react-router-dom';


export const CourseDetail = () => {
  const {courseId } = useParams();
 
  console.log('courseId:', courseId);

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ happened: false, msg: '' });
  const isMountedRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }
  
      setIsLoading(true);
      setError({ happened: false, msg: '' });
  
      try {
        const response = await fetch(`http://localhost:3000/courses/${courseId}`);
  
        if (!response.ok) {
          console.log("Error response:", response.status);
          setError({
            happened: true,
            msg: `${response.status}: ${response.statusText}`,
          });
          setIsLoading(false);
          return;
        }
  
        const fetchedCourse = await response.json();
  
        if (isMountedRef.current) {
          console.log("Setting course data:", fetchedCourse);
          setCourse(fetchedCourse);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError({
          happened: true,
          msg: err.message,
        });
  
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      console.log("Cleanup");
      isMountedRef.current = false;
    };
  }, [courseId]);
  
  

  if (isLoading || !course) {
    return <p>Loading...</p>;
  }

  const { title, description, image, categories, startTime, endTime, instructor } = course;
  const categoriesContent = categories ? categories.join(', ') : 'N/A';

  if (!instructor) {
    return <p>Instructor information not available</p>;
  }

  return (
    <Link to={`/course/${course.id}`}>
    <Box maxW="xl" mx="auto" my="4" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="#8AC7DE" boxShadow="lg" >
    <Text fontSize="xl" fontWeight="bold">Geselecteerde Cursus</Text>
    <HStack spacing="4">
   
        <Image
          src={course.image}
          alt={course.title}
          style={styles.image}
          
        />
       <VStack align="start" spacing="4" flex="1">
          <Text as="h3" fontSize="lg" fontWeight="bold" color="blue.500" mb={2}>
            {title}
          </Text>
          <Text>
            <strong>Omschrijving:</strong>
            {description}
          </Text>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>
              <strong>Categorieën:</strong> {categoriesContent}
            </Text>
          </Box>
          <Box>
            <Text>
              <TimeIcon />
              <strong>Starttijd:</strong> {startTime}
            </Text>
            <Text>
              <TimeIcon />
              <strong>Eindtijd:</strong> {endTime }
            </Text>
            <Text>
          <strong>Locatie:</strong> {course.location}
        </Text>
        <Text>
          <strong>Prijs:</strong> {course.prijs}
        </Text>
        <Text>
          <strong>Website:</strong> {course.website}
        </Text>
        <Text>
          <strong>Quote: </strong> {course.quote}
        </Text>
          </Box>
          <HStack spacing="2">
            <Text>
            <strong>Docent: </strong> {course.instructor?.name || "Informatie niet beschikbaar"}</Text>
            {course.instructor?.image && (
              <Image
                src={course.instructor?.image}
                alt={course.instructor?.name}
                style={styles.imageInstrutor}
              />
            )}
          </HStack>
        </VStack> 
      </HStack>
      <Text fontSize="xl" fontWeight="bold">Schrijf je nu in:</Text>
      <Text colorScheme="blue" variant="outline" ml={4} mt={4} mr={4} mb={4}>
                     inschrijvingcursus@email.nl
                    </Text>
    </Box>
    </Link>
  );
};
