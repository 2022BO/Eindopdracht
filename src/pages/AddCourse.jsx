import { useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { CourseForm } from "../components/CourseForm";



const AddCourse = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    instructor: { name: "", image: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { title, description, startTime, endTime, instructor } = courseData;

      const response = await fetch("/add-course-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          startTime,
          endTime,
          instructor: {
            name: instructor.name,
            image: instructor.image,
          },
        }),
      });

      if (response.ok) {
        console.log("Course saved successfully!");
        history.push('/');
      } else {
        console.error("Error saving course:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  return (
    <div>
      <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Voeg hier je cursus toe</h1>
        
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
          onChange={(e) =>
            setCourseData({
              ...courseData,
              instructor: { ...courseData.instructor, name: e.target.value },
            })
          }
          required
        />
        <label>Instructor Image URL:</label>
        <Input
          type="text"
          name="instructorImage"
          value={courseData.instructor.image}
          onChange={(e) =>
            setCourseData({
              ...courseData,
              instructor: { ...courseData.instructor, image: e.target.value },
            })
          }
        />
        <Button onClick={() => setFormOpen(true)}>Open CourseForm</Button>
        {isFormOpen && (
          <CourseForm
            addCourse={handleSaveChanges}
            onClose={() => setFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
};


export default AddCourse;