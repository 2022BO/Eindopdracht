import React, { useState, useEffect } from 'react';
import AddCourse from './AddCourse';
import {
  Box,
  Text,
  Container,
  Button,
  Image,
  ListItem,
  UnorderedList,
  Heading,
  useToast,
 
  
} from '@chakra-ui/react';
import styles from './StylePage';
import CourseForm from '../components/CourseForm';


export const EventPage = () => {
 
  const toast = useToast();
  //const toastIdRef = React.useRef();
  //const [courses, setCourses] = useState([]); 
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
 
  const handleEditClick = (editedData) => {
    setFormOpen(true);
    console.log('handleEditClick called with:', editedData);
    setEditMode(true);
    setEditedData(editedData);
    setSelectedCourse(editedData);
  };


  const handleSaveChanges = async (editedData) => {
    try {
      const response = await fetch(`/api/courses/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      
      if (response.ok) {
        setEditMode(false);
        // Update de cursussen na succesvol verwijderen
        {/*Show a message on success or on failure. This can be done e.g. in the form of a toast.*/}
        //const updatedCourses = courses.filter((course) => course.id !== courseId);
        //setCourses(updatedCourses);
        toast({ description: 'Course deleted successfully', status: 'success' });
        {/*Redirect the user back to the events page */}
       
      } else {
        toast({ description: 'Failed to delete course', status: 'error' });
      }
    

    } catch (error) {
      console.error('Error deleting course:', error);
      toast({ description: 'Oops! Update Failed!', status: 'error' });
    }
  };

  useEffect(() => {
    console.log('Selected Course:', selectedCourse);
    setEditedData(selectedCourse || {});
  }, [selectedCourse]);
    
  
  return (
    <Box style={styles.pageContainer}>
     <Container style={{ ...styles.container, background: 'linear-gradient(to right, #3498db, #2ecc71)' }}>
        <Heading style={styles.heading}>Leren & Ontwikkelen in de GGZ</Heading>
        {/* Render the CourseForm component */}
        <CourseForm
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveChanges}
        data={selectedCourse}
      />
        <Box style={styles.header}>
          <h1>Welkom bij de Cursusbeheer Pagina!</h1>
          <Button onClick={() => handleEditClick(editedData)}>
        Edit
      </Button>
    
          <Text mb={4}>
          Op deze pagina kun je eenvoudig nieuwe cursussen toevoegen aan het Leren & Ontwikkelen in de GGZ-platform. Hier zijn de stappen om een cursus toe te voegen:
      </Text>
          <Text mb={4}>
        Ontdek hier hoe je nieuwe cursussen kunt toevoegen en beheren op het platform voor Leren & Ontwikkelen in de GGZ.
      </Text>
      <Text mb={4}>
        Leer hoe je eenvoudig relevante informatie invoert en je bijdrage levert aan een groeiende educatieve community!
      </Text>
      <UnorderedList>
      <ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
    Navigeer naar "Cursus Toevoegen"
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Klik op de knop "Cursus Toevoegen" om te beginnen met het invoeren van gegevens voor je nieuwe cursus.
    </Text>
</ListItem>
<ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
Vul de Cursusinformatie in
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Voer de vereiste gegevens in, zoals titel, beschrijving, starttijd, eindtijd, categorieën, instructeur en instructeursafbeelding.
        Je kunt optionele velden ook invullen om meer details toe te voegen.
    </Text>
</ListItem>
<ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
Kies Categorieën"
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Selecteer de relevante categorieën voor je cursus, zoals "geestelijke gezondheid", "kinder en jeugd" of "professionele ontwikkeling".
    </Text>
</ListItem>
<ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
Docent informatie
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Voer de naam van de instructeur in en voeg indien mogelijk een afbeelding toe voor een persoonlijk tintje.
    </Text>
</ListItem>
<ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
Bewaar je Nieuwe Cursus
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Klik op "Opslaan" om je nieuwe cursus aan het platform toe te voegen.
    </Text>
    </ListItem>
    <ListItem style={{fontSize: '1 em' , fontWeight: 'bold' }}>
    Bekijk je Werk
    <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
    Zodra opgeslagen, kun je de details van je nieuwe cursus bekijken op de hoofdpagina.
    </Text> 
</ListItem>
</UnorderedList>
        </Box>
        {editMode ? (
          <Box style={styles.editContainer}>
            
           
          <Button onClick={() => setEditMode(false)} style={styles.cancelButton}>
              Annuleren
            </Button>
          </Box>
        ) : (
          <Box style={styles.courseContainer}>
            {editedData && (
              <div key={editedData.id}>
                {editedData.image && (
                  <Image src={editedData.image} alt={editedData.title} style={styles.image} />
                )}
                <Box style={styles.box}>
                  <Heading style={styles.heading}>{editedData.title}</Heading>
                  <p>{editedData.description}</p>
                  <p>Starttijd: {editedData.startTime}</p>
                  <p>Eindtijd: {editedData.endTime}</p>
                  <p>categorieën: {editedData.categories?.join(', ')}</p>
                  <p>Docent: {editedData.instructor?.name}</p>
                  {editedData.instructor?.image && (
                    <Image
                      src={editedData.instructor?.image}
                      alt={editedData.instructor?.name}
                      style={styles.image}
                    />
                  )}
                 <Button onClick={() => {
  setEditMode(true);
  setSelectedCourse(editedData); // Set the selected course for editing
}} style={styles.editButton}>
  Cursus toevoegen
</Button>
{/* Add a delete button that allows the user to delete the event.*/}
{/* Sent a delete request to the server after confirmation.*/}
{/* Add an extra check and warning to make sure that the user is 100% sure they want to delete the event */}
                  <Button
          colorScheme="red"
          variant="outline"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this course?')) {
              handleDeleteCourse(editedData.id);
            }
          }}
        >
          Delete
        </Button>
        
                </Box>

              </div>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};













{/* Sent a delete request to the server after confirmation.*/}
{/*Redirect the user back to the events page */}

  
//The event page shows the following details:  title, description, image, startTime, endTime, categories and by who it’s created (display their name and image).

//You can click on an edit button where the user can edit the details shown on the page. This has to be done in a modal or on the same page, not an external page. 

//The back-end server data is updated after.

//A succes or fail message is shown after a successful update.

//You can click on a delete button to delete the event.

//A delete query is sent to delete the data in the back-end.

//After deleting an event, you get redirected to the Events page.
 







