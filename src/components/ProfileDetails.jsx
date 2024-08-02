import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentRequest } from '../features/student/studentSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProfileDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentRequest());
  }, [dispatch]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 bg-gray-50">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Student Profile Details
      </motion.h1>

      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 space-y-6">
        {/* Personal Information */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
            Personal Information
          </h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Name:</td>
                <td className="py-2 px-4 text-gray-900">{student.personalInfo?.name || 'N/A'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Age:</td>
                <td className="py-2 px-4 text-gray-900">{student.personalInfo?.age || 'N/A'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Email:</td>
                <td className="py-2 px-4 text-gray-900">{student.personalInfo?.email || 'N/A'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-gray-700">Contact Number:</td>
                <td className="py-2 px-4 text-gray-900">{student.personalInfo?.contactNumber || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Educational History */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
            Education
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className=" bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md">
                <th className="py-2 px-4">Institution</th>
                <th className="py-2 px-4">Degree</th>
                <th className="py-2 px-4">Years</th>
              </tr>
            </thead>
            <tbody>
              {student.educationHistory?.length ? (
                student.educationHistory.map((education, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 border-b text-gray-900">{education.institution}</td>
                    <td className="py-2 px-4 border-b text-gray-900">{education.degree}</td>
                    <td className="py-2 px-4 border-b text-gray-900">{education.years}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-center text-gray-700">No educational history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enrolled Courses */}
        <div className="pb-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
            Enrolled Courses
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md">
                <th className="py-2 px-4">Course Name</th>
                <th className="py-2 px-4">Instructor</th>
                <th className="py-2 px-4">Duration</th>
              </tr>
            </thead>
            <tbody>
              {student.enrolledCourses?.length ? (
                student.enrolledCourses.map((course, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 border-b text-gray-900">{course.name}</td>
                    <td className="py-2 px-4 border-b text-gray-900">{course.instructor}</td>
                    <td className="py-2 px-4 border-b text-gray-900">{course.duration}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-center text-gray-700">No enrolled courses available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <motion.button
        onClick={() => navigate('/edit')}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mx-auto block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Edit
      </motion.button>
    </div>
  );
}

export default ProfileDetails;
