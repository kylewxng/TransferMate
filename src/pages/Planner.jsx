import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";
import { useAuth } from "../contexts/authContext";
import NavBar from "../components/NavBar";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Planner() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    term: "",
    title: "",
    units: "",
    grade: "",
  });
  const [showClearModal, setShowClearModal] = useState(false);
  const [termOrder, setTermOrder] = useState([
    "Summer 2024",
    "Fall 2024",
    "Winter 2025",
    "Spring 2025",
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser?.uid) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCourses(data.courses || []);
      }
    };
    fetchCourses();
  }, [currentUser]);

  const handleAddCourse = async () => {
    const updatedCourses = [...courses, courseForm];
    setCourses(updatedCourses);
    await updateDoc(doc(db, "users", currentUser.uid), {
      courses: updatedCourses,
    });
    setCourseForm({ term: "", title: "", units: "", grade: "" });
    setShowCourseModal(false);
  };

  const handleDeleteCourse = async (courseToDelete) => {
    const updatedCourses = courses.filter(
      (course) =>
        course.title !== courseToDelete.title ||
        course.term !== courseToDelete.term
    );
    setCourses(updatedCourses);
    await updateDoc(doc(db, "users", currentUser.uid), {
      courses: updatedCourses,
    });
  };

  const handleClearAll = async () => {
    setCourses([]);
    await updateDoc(doc(db, "users", currentUser.uid), { courses: [] });
    setShowClearModal(false);
  };

  // Add next term dynamically
  const handleAddTerm = () => {
    const lastTerm = termOrder[termOrder.length - 1];
    const nextTerm = getNextTerm(lastTerm);
    setTermOrder([...termOrder, nextTerm]);
  };

  // Function to get the next term
  const getNextTerm = (currentTerm) => {
    const [term, yearStr] = currentTerm.split(" ");
    const year = parseInt(yearStr);

    switch (term) {
      case "Summer":
        return `Fall ${year}`;
      case "Fall":
        return `Winter ${year + 1}`;
      case "Winter":
        return `Spring ${year}`;
      case "Spring":
        return `Summer ${year}`;
      default:
        return "";
    }
  };

  const handleDeleteTerm = () => {
    if (termOrder.length > 4) {
      // Don't allow deleting the first 4 terms
      const updatedTerms = termOrder.slice(0, termOrder.length - 1);
      setTermOrder(updatedTerms);

      // Remove courses associated with the deleted term
      const termToDelete = termOrder[termOrder.length - 1];
      const updatedCourses = courses.filter(
        (course) => course.term !== termToDelete
      );
      setCourses(updatedCourses);

      updateDoc(doc(db, "users", currentUser.uid), {
        courses: updatedCourses,
      });
    }
  };

  return (
    <>
      <NavBar />
      <motion.div
        key="step-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-16 py-10 bg-white">
          <h1 className="text-4xl font-bold text-black mb-4 ml-20">
            Your Transfer Planner
          </h1>
          <p className="text-gray-600 mb-8 ml-20">
            Automatically generate a semester-by-semester course plan to help
            you stay on track for transfer.
          </p>

          <div className="flex space-x-6 overflow-x-auto justify-center">
            {termOrder.map((term) => (
              <div
                key={term}
                className="min-w-[300px] bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
              >
                <div className="font-semibold text-lg text-gray-900 mb-4">
                  {term}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {courses
                    .filter((course) => course.term === term)
                    .map((course, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F5F7FD] p-4 border border-[#E1E6F2] rounded-xl shadow-sm w-[250px]"
                      >
                        <div className="flex justify-between">
                          <div className="text-sm text-gray-900 font-medium">
                            {course.title}
                          </div>
                          <button
                            onClick={() => handleDeleteCourse(course)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">
                          {course.units} units
                        </p>
                        <p className="text-sm text-gray-600">{course.grade}</p>
                        <p className="text-sm text-gray-600">
                          {course.requirement}
                        </p>
                      </div>
                    ))}
                  {/* Add button for each term */}
                  <div
                    className="mt-4 text-center text-blue-600 cursor-pointer"
                    onClick={() => {
                      setCourseForm({ term, title: "", units: "", grade: "" });
                      setShowCourseModal(true);
                    }}
                  >
                    + Add new course
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons (styled and positioned) */}
          <div className="mt-10 flex justify-start items-center ml-20">
            <button
              onClick={() => setShowClearModal(true)}
              className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md"
            >
              Clear All
            </button>
            <div className="flex space-x-4 ml-4">
              <button className="bg-purple-500 text-white px-8 py-3 rounded-lg shadow-md">
                Regenerate
              </button>
              <button
                onClick={handleAddTerm}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md"
              >
                Add Term
              </button>
              <button
                onClick={handleDeleteTerm}
                className="bg-red-700 text-white px-8 py-3 rounded-lg shadow-md"
              >
                Delete Term
              </button>
            </div>
          </div>
        </div>

        {/* Course Modal */}
        {showCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="text-gray-400 hover:text-black"
                >
                  <X />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-4">Add Course</h2>

              {/* Term Selection */}
              <div className="mb-4">
                <p className="font-semibold mb-1">Term</p>
                <p className="text-sm text-gray-500 mb-2">
                  Pick the semester term
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Summer 2024",
                    "Fall 2024",
                    "Winter 2025",
                    "Spring 2025",
                    "Summer 2025",
                    "Fall 2025",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setCourseForm({ ...courseForm, term })}
                      className={`border rounded px-3 py-1 text-sm ${
                        courseForm.term === term
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Title */}
              <div className="mb-4">
                <p className="font-semibold mb-1">Course Title</p>
                <p className="text-sm text-gray-500 mb-1">
                  Copy how your course is titled for your CC
                </p>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="e.g., MATH 285"
                  value={courseForm.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[a-zA-Z0-9\s]*$/.test(val)) {
                      setCourseForm({ ...courseForm, title: val });
                    }
                  }}
                />
              </div>

              {/* Units */}
              <div className="mb-4">
                <p className="font-semibold mb-1">Units</p>
                <p className="text-sm text-gray-500 mb-1">
                  How many semester units
                </p>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full border p-2 rounded"
                  placeholder="e.g., 4.0"
                  value={courseForm.units}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, units: e.target.value })
                  }
                />
              </div>

              {/* Grade */}
              <div className="mb-4">
                <p className="font-semibold mb-1">Grade</p>
                <p className="text-sm text-gray-500 mb-2">
                  Pick final course grade
                </p>
                <div className="flex gap-3">
                  {["A", "B", "C", "D", "F"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setCourseForm({ ...courseForm, grade: g })}
                      className={`border px-4 py-2 rounded ${
                        courseForm.grade === g ? "bg-blue-200" : "bg-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    if (
                      courseForm.title &&
                      courseForm.units &&
                      courseForm.grade &&
                      courseForm.term
                    ) {
                      setCourses([...courses, courseForm]);
                      setCourseForm({
                        term: "",
                        title: "",
                        units: "",
                        grade: "",
                      });
                      setShowCourseModal(false);
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
                >
                  Confirm course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear All Modal */}
        {showClearModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
              <h2 className="text-xl font-bold mb-4">Clear All Courses</h2>
              <p className="mb-6">
                Are you sure you want to clear your planner? Any cleared courses
                can no longer be brought back.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 text-white px-6 py-2 rounded-md"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
