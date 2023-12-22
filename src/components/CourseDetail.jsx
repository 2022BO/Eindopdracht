import React from 'react';
import { Box, Heading, VStack, Image, Text } from '@chakra-ui/react';

const CourseDetail = ({ course, onSelect }) => {
  if (!course) {
    return null;
  }

  const {
    title,
    description,
    image,
    startTime,
    endTime,
    categories,
    instructor: { name: instructorName, image: instructorImage },
  } = course;

  return (
    <Box>
      <Heading fontSize='xl' mb={2}>
        {title}
      </Heading>
      <VStack align="start" spacing={2}>
        <Box>
          <strong>Description:</strong> {description}
        </Box>
        <Box>
          <strong>Start Time:</strong> {startTime}
        </Box>
        <Box>
          <strong>End Time:</strong> {endTime}
        </Box>
        <Box>
          <strong>Categories:</strong> {categories.join(', ')}
        </Box>
        <Box>
          <strong>Instructor:</strong>
          {instructorName} {instructorImage && (
            <img src={instructorImage} alt={`Image for ${instructorName}`} style={{ maxWidth: '50px' }} />
          )}
          <Link to={`/event/${course.id}`}>
        <Button colorScheme='blue' mt={2} onClick={onSelect}>
          Bekijk details
        </Button>
      </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default CourseDetail;
