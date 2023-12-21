import { useState } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    startTime: '', 
    endTime: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCourse = async () => {
    try {
      const response = await fetch('/add-course-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
      } else {
        // Handle error, maybe show an error message
      }
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <form onSubmit={handleAddCourse}>
    <div>
      <h1>Add course</h1>
      <label>Title:</label>
      <Input
        type="text"
        name="title"
        value={courseData.title}
        onChange={handleInputChange}
        required
      />
       <label>Description:</label>
        <Textarea
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
          required
        />
         <label>Start Time:</label>
        <Input
          type="text"
          name="startTime"
          value={courseData.startTime}
          onChange={handleInputChange}
          required
        />
        <label>End Time:</label>
        <Input
          type="text"
          name="endTime"
          value={courseData.endTime}
          onChange={handleInputChange}
          required
        />
         </div>
      <div>
        <label>Instructor Name:</label>
      <Input
        type="text"
        name="instructorName"
        value={courseData.instructor.name}
        onChange={(e) => setCourseData({
          ...courseData,
          instructor: { ...courseData.instructor, name: e.target.value },
        })}
        required
      />
      <label>Instructor Image URL:</label>
      <Input
        type="text"
        name="instructorImage"
        value={courseData.instructor.image}
        onChange={(e) => setCourseData({
          ...courseData,
          instructor: { ...courseData.instructor, image: e.target.value },
        })}
      />
      <Button type="submit" colorScheme="green">
        Add Course
      </Button>
    </div>
    </form>
  );
};

export default AddCourse;
