import React, { useState, useEffect } from 'react';
import { CourseForm } from '../components/CourseForm';
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


export const EventPage = () => {
  const toast = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const handleEditClick = (editedData) => {
    setFormOpen(true);
    setEditMode(true);
    setEditedData(editedData);
    setSelectedCourse(editedData);
  };

  const handleAddCourseClick = () => {
    setEditMode(true);
    setFormOpen(true);
    setEditedData({});
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({ description: 'Course deleted successfully', status: 'success' });
      } else {
        toast({ description: 'Failed to delete course', status: 'error' });
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({ description: 'Oops! Delete Failed!', status: 'error' });
    }
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
        setEditMode(false);
        toast({ description: 'Course saved successfully', status: 'success' });
      } else {
        toast({ description: 'Failed to save course changes', status: 'error' });
      }
    } catch (error) {
      console.error('Error saving course changes:', error);
      toast({ description: 'Oops! Save Failed!', status: 'error' });
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

        <CourseForm
          isOpen={isFormOpen}
          onClose={() => setFormOpen(false)}
          onSave={handleSaveChanges}
          data={selectedCourse}
        />

        <Box style={styles.header}>
          <h1>Welkom bij de Cursusbeheer Pagina!</h1>
          <Text mb={4}>
            Op deze pagina kun je eenvoudig nieuwe cursussen toevoegen aan het Leren & Ontwikkelen in de GGZ-platform.
            Hier zijn de stappen om een cursus toe te voegen:
          </Text>
          <Text mb={4}>
            Ontdek hier hoe je nieuwe cursussen kunt toevoegen en beheren op het platform voor Leren & Ontwikkelen in de GGZ.
          </Text>
          <Text mb={4}>
            Leer hoe je eenvoudig relevante informatie invoert en je bijdrage levert aan een groeiende educatieve community!
          </Text>
          <UnorderedList>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Navigeer naar "Cursus Toevoegen"
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Klik op de knop "Cursus Toevoegen" om te beginnen met het invoeren van gegevens voor je nieuwe cursus.
              </Text>
            </ListItem>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Vul de Cursusinformatie in
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Voer de vereiste gegevens in, zoals titel, beschrijving, starttijd, eindtijd, categorieën, instructeur en instructeursafbeelding.
                Je kunt optionele velden ook invullen om meer details toe te voegen.
              </Text>
            </ListItem>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Kies Categorieën"
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Selecteer de relevante categorieën voor je cursus, zoals "geestelijke gezondheid", "kind en jeugd" of "professionele ontwikkeling".
              </Text>
            </ListItem>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Docent informatie
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Voer de naam van de instructeur in en voeg indien mogelijk een afbeelding toe voor een persoonlijk tintje.
              </Text>
            </ListItem>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Bewaar je Nieuwe Cursus
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Klik op "Opslaan" om je nieuwe cursus aan het platform toe te voegen.
              </Text>
            </ListItem>
            <ListItem style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Bekijk je Werk
              <Text mb={2} style={{ fontWeight: 'normal', fontSize: 'inherit' }}>
                Zodra opgeslagen, kun je de details van je nieuwe cursus bekijken op de hoofdpagina.
              </Text>
            </ListItem>
          </UnorderedList>
        </Box>

        <Box style={editMode ? styles.editContainer : styles.courseContainer}>
          {editedData && (
            <div key={editedData.id}>
              {editedData.image && (
                <Image src={editedData.image} alt={editedData.title} style={styles.image} />
              )}
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
            </div>
          )}
        </Box>
      </Container>
    </Box>
  );
};
