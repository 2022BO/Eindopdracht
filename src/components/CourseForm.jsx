import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import AddCourse from '../pages/AddCourse';


export const CourseForm = ({ onSave, onCancel, data }) => {
  const [isOpen, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [instructor, setInstructor] = useState({ name: "", image: "" });

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Saving changes...");

    const courseData = {
      title,
      description,
      startTime,
      endTime,
      categories: typeof categories === "string" ? categories.split(", ") : [],
      instructor: {
        name: instructor.name,
        image: instructor.image,
      },
    };

    try {
      await addCourse(courseData);
        // Reset form fields after successful save
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setCategories([]);
        setInstructor({ name: "", image: "" });
  
        onClose && onClose();
      } catch (error) {
        console.error("Error saving course:", error);
      }
    };
  

    return (
      <Box>
        <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            background: "linear-gradient(to bottom,#2ecc, #3498db )",
            color: "white",
            justifyContent: "space-between",
          }}
        >
          <ModalHeader>Cursus Toevoegen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Titel</FormLabel>
              <Input
                placeholder="Vul in Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
<FormControl isRequired>
<FormLabel>Omschrijving</FormLabel>
<Input
  placeholder='Vul in Description'
  value={description}
  onChange={(e) => setDescription(e.target.value )}
/>
</FormControl>

<FormControl isRequired>
<FormLabel>Starttijd</FormLabel>
<Input
  placeholder='Vul in Starttijd'
  value={startTime}
  onChange={(e) => setStartTime(e.target.value )}
 
/>
</FormControl>

<FormControl isRequired>
<FormLabel>Eindtijd</FormLabel>
<Input
  placeholder='Vul in Eindtijd'
  value={endTime}
  onChange={(e) => setEndTime(e.target.value )}
  
/>
</FormControl>

<FormControl isRequired>
<FormLabel>Categorieën</FormLabel>
<FormHelperText fontSize="xs" color="white.500">
  Kies: "geestelijke gezondheid", "kind en jeugd", "professionele ontwikkeling"
</FormHelperText>
</FormControl>
<Input
  placeholder='Vul in categorieën in, gescheiden door een komma'
  value={categories.join(',')}
  onChange={(e) => setCategories(e.target.value.split(','))}
/>
<FormControl isRequired>
  <FormLabel>Docent naam</FormLabel>
  <Input
    placeholder='Vul in Docent naam'
    value={instructor.name}
   
    onChange={(e) => setInstructor({
      ...instructor,
      name: e.target.value,
    })}
  />
</FormControl>
<FormControl>
  <FormLabel>Docent afbeelding</FormLabel>
  <Input
    placeholder='Voeg toe afbeelding docent URL'
    value={instructor.image}
 
    onChange={(e) => setInstructor({
      ...instructor,
      image: e.target.value,
    })}
  />
</FormControl> 
</ModalBody>
</ModalContent>  
<ModalFooter style={{ justifyContent: "space-between" }}>
          <Button
            colorScheme="blue"
            onClick={(event) => handleSaveChanges(event)}
          >
            Opslaan
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            ml={4}
            onClick={onClose}
          >
            Annuleer
          </Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
};
