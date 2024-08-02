import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchStudentRequest, updateStudentRequest } from '../features/student/studentSlice';
import { motion } from 'framer-motion';

function ProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, loading, error } = useSelector((state) => state.student);

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    age: '',
    email: '',
    contactNumber: '',
  });
  const [educationHistory, setEducationHistory] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchStudentRequest());
  }, [dispatch]);

  useEffect(() => {
    if (student) {
      setPersonalInfo(student.personalInfo || { name: '', age: '', email: '', contactNumber: '' });
      setEducationHistory(student.educationHistory || []);
      setEnrolledCourses(student.enrolledCourses || []);
    }
  }, [student]);

  const handleSave = () => {
    const hasPersonalInfoChanged = JSON.stringify(personalInfo) !== JSON.stringify(student.personalInfo);
    const hasEducationChanged = JSON.stringify(educationHistory) !== JSON.stringify(student.educationHistory);
    const hasCoursesChanged = JSON.stringify(enrolledCourses) !== JSON.stringify(student.enrolledCourses);

    if (hasPersonalInfoChanged || hasEducationChanged || hasCoursesChanged) {
      dispatch(updateStudentRequest({ personalInfo, educationHistory, enrolledCourses }));
      navigate('/');
    } else {
      alert('No changes to save.');
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Edit Profile
      </motion.h1>

      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 space-y-6">
        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-md mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              placeholder="Name"
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              value={personalInfo.age}
              onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
              placeholder="Age"
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              placeholder="Email"
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              value={personalInfo.contactNumber}
              onChange={(e) => setPersonalInfo({ ...personalInfo, contactNumber: e.target.value })}
              placeholder="Contact Number"
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Educational History */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-md mb-4">
            Education
          </h2>
          {educationHistory.map((education, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
              <input
                type="text"
                value={education.institution}
                onChange={(e) => {
                  const updatedEducation = [...educationHistory];
                  updatedEducation[index] = { ...updatedEducation[index], institution: e.target.value };
                  setEducationHistory(updatedEducation);
                }}
                placeholder="Institution"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                value={education.degree}
                onChange={(e) => {
                  const updatedEducation = [...educationHistory];
                  updatedEducation[index] = { ...updatedEducation[index], degree: e.target.value };
                  setEducationHistory(updatedEducation);
                }}
                placeholder="Degree"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                value={education.years}
                onChange={(e) => {
                  const updatedEducation = [...educationHistory];
                  updatedEducation[index] = { ...updatedEducation[index], years: e.target.value };
                  setEducationHistory(updatedEducation);
                }}
                placeholder="Years"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <button
                onClick={() => {
                  const updatedEducation = educationHistory.filter((_, i) => i !== index);
                  setEducationHistory(updatedEducation);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setEducationHistory([...educationHistory, { institution: '', degree: '', years: '' }])
            }
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          >
            Add Institution
          </button>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-md mb-4">
            Enrolled Courses
          </h2>
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
              <input
                type="text"
                value={course.name}
                onChange={(e) => {
                  const updatedCourses = [...enrolledCourses];
                  updatedCourses[index] = { ...updatedCourses[index], name: e.target.value };
                  setEnrolledCourses(updatedCourses);
                }}
                placeholder="Course Name"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                value={course.instructor}
                onChange={(e) => {
                  const updatedCourses = [...enrolledCourses];
                  updatedCourses[index] = { ...updatedCourses[index], instructor: e.target.value };
                  setEnrolledCourses(updatedCourses);
                }}
                placeholder="Instructor"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <input
                type="text"
                value={course.duration}
                onChange={(e) => {
                  const updatedCourses = [...enrolledCourses];
                  updatedCourses[index] = { ...updatedCourses[index], duration: e.target.value };
                  setEnrolledCourses(updatedCourses);
                }}
                placeholder="Duration"
                className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              />
              <button
                onClick={() => {
                  const updatedCourses = enrolledCourses.filter((_, i) => i !== index);
                  setEnrolledCourses(updatedCourses);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setEnrolledCourses([...enrolledCourses, { name: '', instructor: '', duration: '' }])
            }
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          >
            Add Course
          </button>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <motion.button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
