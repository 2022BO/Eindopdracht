import React from 'react';
import './style.css'; // Import the stylesheet

const CourseDetail = ({ course }) => {
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
    <div className="course-detail-container">
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt={title} />
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>Categories: {categories.join(', ')}</p>
      <p>Created by: {instructorName}</p>
      <img src={instructorImage} alt={instructorName} />
    </div>
  );
};

export default CourseDetail;