import React from 'react';
import { Box, Button, FormControl, FormLabel, FormHelperText, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton } from '@chakra-ui/react';

const CourseForm = ({ isOpen, onClose, onSave, data }) => {
  const [editedData, setEditedData] = React.useState(data || {});

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
        <Box>
           <Modal isOpen={isOpen} onClose={() => onClose()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cursus Toevoegen</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl isRequired>
<FormLabel>Titel</FormLabel>
<Input
  placeholder='Vul in Title'
  value={editedData.title || ''}
  onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
/>
</FormControl>
<FormControl isRequired>
<FormLabel>Omschrijving</FormLabel>
<Input
  placeholder='Vul in Description'
  value={editedData.description || ''}
  onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
/>
</FormControl>

<FormControl isRequired>
<FormLabel>Starttijd</FormLabel>
<Input
  placeholder='Vul in Start Time'
  value={editedData.startTime || ''}
  onChange={(e) => setEditedData({ ...editedData, startTime: e.target.value })}
/>
</FormControl>

<FormControl isRequired>
<FormLabel>Eindtijd</FormLabel>
<Input
  placeholder='Vul in End Time'
  value={editedData.endTime || ''}
  onChange={(e) => setEditedData({ ...editedData, endTime: e.target.value })}
/>
</FormControl>

<FormControl isRequired>
<FormLabel>categorieën</FormLabel>
<FormHelperText fontSize="xs" color="gray.500">
  Kies: "geestelijke gezondheid", "kinder en jeugd", "professionele ontwikkeling"
</FormHelperText>
</FormControl>
<Input
  placeholder='Vul in categorieën in, gescheiden door een komma'
  value={editedData.categories?.join(', ') || ''}
  onChange={(e) => setEditedData({ ...editedData, categories: e.target.value.split(', ') })}
/>

<FormControl isRequired>
<FormLabel>Docent naam</FormLabel>
<Input
  placeholder='Vul in Instructor Name'
  value={editedData.instructor?.name || ''}
  onChange={(e) => setEditedData({
    ...editedData,
    instructor: { ...editedData.instructor, name: e.target.value },
  })}
/>
</FormControl>
<FormControl>
<FormLabel>Docent Image</FormLabel>
<Input
  placeholder='Vul in Instructor Image URL'
  value={editedData.instructor?.image || ''}
  onChange={(e) => setEditedData({
    ...editedData,
    instructor: { ...editedData.instructor, image: e.target.value },
  })}
/>
</FormControl>         
            </ModalBody>
            <ModalFooter>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>
  Save
</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Box>
  )
}
        export default CourseForm;