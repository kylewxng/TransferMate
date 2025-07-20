// Courses.jsx
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";
import { useAuth } from "../contexts/authContext";
import NavBar from "../components/NavBar";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Courses() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    term: "",
    title: "",
    units: "",
    grade: "",
  });

  const termOrder = ["Summer", "Fall", "Winter", "Spring"];

  useEffect(() => {
    const fetchCourses = async () => {
      if (!currentUser?.uid) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const sortedCourses = (data.courses || []).sort((a, b) => {
          const termA = termOrder.findIndex((t) => a.term.includes(t));
          const termB = termOrder.findIndex((t) => b.term.includes(t));
          if (termA !== termB) return termA - termB;
          const yearA = parseInt(a.term.split(" ")[1]);
          const yearB = parseInt(b.term.split(" ")[1]);
          return yearA - yearB;
        });
        setCourses(sortedCourses);
      }
    };
    fetchCourses();
  }, [currentUser]);

  const handleDelete = async (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    await updateDoc(doc(db, "users", currentUser.uid), {
      courses: updatedCourses,
    });
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
        <div className="pr-12 pl-24 py-10">
          <h1 className="text-4xl font-bold mb-1">My Courses</h1>
          <p className="text-gray-600 mb-6">
            Manage the UC-articulated courses for your transfer
          </p>

          <div className="rounded-xl overflow-hidden border">
            <div className="grid grid-cols-5 bg-gray-100 px-6 py-3 font-semibold text-indigo-700 text-sm">
              <div>Term</div>
              <div>Course</div>
              <div>Units</div>
              <div>Grade</div>
              <div>Requirement</div>
            </div>
            <div className="flex flex-col divide-y">
              {courses.map((course, idx) => (
                <div key={idx} className="px-6 py-4 bg-white">
                  <div className="grid grid-cols-5 items-center text-sm">
                    <div>{course.term}</div>
                    <div>{course.title}</div>
                    <div>{course.units}</div>
                    <div>{course.grade}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800">Major Preparation</span>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                        onClick={() => {
                          setCourseForm(course);
                          setEditingIndex(idx);
                          setShowCourseModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="px-6 py-4 bg-white text-gray-500 hover:text-black cursor-pointer"
                onClick={() => {
                  setCourseForm({ term: "", title: "", units: "", grade: "" });
                  setEditingIndex(null);
                  setShowCourseModal(true);
                }}
              >
                + Add new course
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
              AI Suggestions (coming soon)
            </h2>
            <div className="border rounded-lg p-4 bg-gray-50 text-gray-500">
              This section will include AI-recommended courses to fulfill major
              prep or GE requirements.
            </div>
          </div>
        </div>

        {showCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowCourseModal(false);
                    setEditingIndex(null);
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  <X />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-4">
                {editingIndex !== null ? "Edit Course" : "Add Course"}
              </h2>

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
                  onClick={async () => {
                    if (
                      courseForm.title &&
                      courseForm.units &&
                      courseForm.grade &&
                      courseForm.term
                    ) {
                      let updatedCourses;
                      if (editingIndex !== null) {
                        updatedCourses = [...courses];
                        updatedCourses[editingIndex] = courseForm;
                      } else {
                        updatedCourses = [...courses, courseForm];
                      }
                      setCourses(updatedCourses);
                      await updateDoc(doc(db, "users", currentUser.uid), {
                        courses: updatedCourses,
                      });
                      setCourseForm({
                        term: "",
                        title: "",
                        units: "",
                        grade: "",
                      });
                      setEditingIndex(null);
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
      </motion.div>
    </>
  );
}
