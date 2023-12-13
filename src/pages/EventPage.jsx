// EventPage.jsx
import React, { useEffect, useState } from 'react';
import { Heading, List, ListItem, Container, Box } from '@chakra-ui/react';
import CourseDetail from '../components/CourseDetail';
import styles from './StylePage';

export const EventPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/events.json')
      .then(response => response.json())
      .then(jsonData => {
        console.log('Ontvangen data:', jsonData);
        setData(jsonData);
      })
      .catch(error => console.error('Fout bij ophalen JSON-gegevens:', error));
  }, []);

  return (
    <Container style={styles.container}>
      <Box style={styles.box}>
        <Heading style={styles.heading}>Leren & Ontwikkelen in de GGZ</Heading>
        {data && data.events && (
          <List className="event-list">
            {data.events.map(event => (
              <ListItem key={event.id} style={styles.container} className="event-item">
                <CourseDetail course={event} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default EventPage;

{/*

Show a message on success or on failure. This can be done e.g. in the form of a toast(opens in a new tab).
function UpdatingToastExample() {
  const toast = useToast()
  const toastIdRef = React.useRef()

  function update() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { description: 'Oops!' })
    }
  }

  function addToast() {
    toastIdRef.current = toast({ description: 'Thank you for updating!' })
  }

  return (
    <Stack isInline spacing={2}>
      <Button onClick={addToast} type='button'>
         Oops! Update Failed
      </Button>

      <Button onClick={update} type='button' variant='outline'>
        Update Successful
      </Button>
    </Stack>
  )
}*/}








{/* Add a delete button that allows the user to delete the event. */}


{/* Add an extra check and warning to make sure that the user is 100% sure they want to delete the event */}

{/* Sent a delete request to the server after confirmation.  */}

{/*Redirect the user back to the events page */}

  

 







