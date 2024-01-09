import React, { useState, useEffect } from 'react';
import { Box, Text, Container, Button, Image} from '@chakra-ui/react';
import styles from './StylePage';
import AddCourse from './AddCourse';
import { CourseDetail } from '../components/CourseDetail';

const EditedDataView = ({ editedData, handleAddCourseClick, handleDeleteCourse }) => (
  <Box>
    <Box style={styles.box}>
      <Text fontSize="lg">Titel: {editedData.title}</Text>
      <Text>Omschrijving: {editedData.description}</Text>
      <Text>Starttijd: {editedData.startTime}</Text>
      <Text>Eindtijd: {editedData.endTime}</Text>
      <Text>Categorieën: {editedData.categories?.join(', ')}</Text>
      <Text>Docent: {editedData.instructor?.name}</Text>
      {editedData.instructor?.image && (
        <Image
          src={editedData.instructor?.image}
          alt={editedData.instructor?.name}
          style={styles.image}
        />
      )}
    </Box>
    <Box style={{ ...styles.box, display: 'flex', justifyContent: 'space-between' }}>
      <Button onClick={handleAddCourseClick} style={styles.editButton}>
        Cursus toevoegen
      </Button>
      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this course?')) {
            handleDeleteCourse(editedData.id);
          }
        }}
      >
        Verwijder
      </Button>
    </Box>
  </Box>
);


export const EventPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const handleUpdateCourses = (newCourse) => {
    console.log('handleUpdateCourses', newCourse); 
  };
  
  useEffect(() => {
    setEditedData(selectedCourse || {});
  }, [selectedCourse]);

  const handleAddCourseClick = () => {
    setEditMode(true);
    setFormOpen(true);
    setEditedData('');
    setSelectedCourse(null);
  };

  const handleSaveChanges = async (editedData) => {
    console.log('Trying to save changes for course:', editedData);
  
    try {
      const response = await fetch(`/api/courses/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
  
      if (response.ok) {
        handleUpdateCourses(editedData);
        setEditMode(false);
      } else {
        console.error('Failed to save course changes. Server returned:', response);
      }
    } catch (error) {
      console.error('Error saving course changes:', error);
    }
  };


  return (
    <div>
    <Box style={styles.pageContainer}>
      <Container style={{ ...styles.container}}>{selectedCourse && (
  <Box mt={4}>
    
    <CourseDetail course={selectedCourse} />
  </Box>
)}      
        {editMode ? (
          <EditedDataView
            editedData={editedData}
            handleAddCourseClick={handleAddCourseClick}
            handleDeleteCourse={handleSaveChanges}
          />
        ) : (
          <AddCourse
            handleUpdateCourses={handleUpdateCourses}
            isOpen={isFormOpen}
            onClose={() => setFormOpen(false)}
            onSave={handleSaveChanges}
            data={selectedCourse}
          />
        )}
      </Container>
    </Box>
    </div>
  );
};
export default EventPage;

//•	The user can click on an event that leads them to the ‘Event’ page using React Router.
//•	A query to add the event to the server is sent as well. 
//•	A succes or fail message is shown after a successful update.