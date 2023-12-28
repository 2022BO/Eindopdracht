//CourseDetail
import React, { useEffect, useState, useRef } from 'react';
import { Box, Image, VStack, Text, HStack } from '@chakra-ui/react';
import styles from '../pages/StylePage';
import { TimeIcon } from '@chakra-ui/icons';

export const CourseDetail = ({ eventId, onSelect }) => {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ happened: false, msg: '' });
  const isMountedRef = useRef(true);

  useEffect(() => {
    setIsLoading(true);
    setError({ happened: false, msg: '' });

    const fetchNewCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/courses/${eventId}`);

        if (!response.ok) {
          setError({
            happened: true,
            msg: `${response.status}: ${response.statusText}`,
          });
          setIsLoading(false);
          return;
        }

        const fetchedCourse = await response.json();
        if (!isMountedRef.current) {
          return; // Component is unmounted, do nothing
        }

        setCourse(fetchedCourse);
        setIsLoading(false);
      } catch (err) {
        setError({
          happened: true,
          msg: err.message,
        });
        setIsLoading(false);
      }
    };

    fetchNewCourse();

    return () => {
      isMountedRef.current = false; // Set the flag to false when the component is unmounted
    };
  }, [eventId]);

  if (error.happened) {
    return <p>The following error occurred: {error.msg}</p>;
  }

  if (isLoading || !course) {
    return <p>Loading...</p>;
  }


  const { title, description, image, categories, startTime, endTime, instructor } = course;
  const categoriesContent = categories ? categories.join(', ') : 'N/A';

  if (!instructor) {
    return <p>Instructor information not available</p>;
  }

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginBottom="20px"
      style={styles.courseDetailBox}
    >

      <HStack spacing="4">
      <Image
  src={course.image}
  alt={course.title}
  style={{
  ...styles.image,
  width: `${course.imageWidth}px`,
  height: `${course.imageHeight}px`,
}}
/>
        <VStack align="start" spacing="2" flex="1">
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          <Text>
          <strong>Omschrijving:</strong>
            {description}</Text>
            <Box style={{ ...styles.box, display: 'flex', justifyContent: 'space-between' }}>
            <Text>
              <strong>Categorieën:</strong> {categoriesContent}
            </Text>
            </Box>
            <Box>
            <Text> <TimeIcon/>
              <strong>Starttijd:</strong> {startTime}
            </Text>
            <Text> <TimeIcon/>
              <strong>Eindtijd:</strong> {endTime}
            </Text>
          </Box>
          <HStack spacing="2">
          <Text>Docent: {course.instructor?.name || "Informatie niet beschikbaar"}</Text>
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
    </Box>
  );
};


