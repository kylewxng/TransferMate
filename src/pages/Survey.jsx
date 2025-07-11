// Survey.jsx
import { useState } from "react";
import { X, Check } from "lucide-react"; // Added Check icon import
import NavBar from "../components/NavBar";
import AppRouter from "../routes/AppRouter";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  "AP Exams",
  "IB Exams",
  "Colleges Attended",
  "Courses",
  "Schools/Majors",
  "Summary",
];

// Autofill options
const AP_EXAMS = [
  "AP Art History",
  "AP Biology",
  "AP Calculus AB",
  "AP Calculus BC",
  "AP Seminar",
  "AP Research",
  "AP Chemistry",
  "AP Chinese Language and Culture",
  "AP Comparative Government and Politics",
  "AP Computer Science A",
  "AP Computer Science Principles",
  "AP English Language and Composition",
  "AP English Literature and Composition",
  "AP Environmental Science",
  "AP European History",
  "AP French Language and Culture",
  "AP German Language and Culture",
  "AP Human Geography",
  "AP Italian Language and Culture",
  "AP Japanese Language and Culture",
  "AP Latin",
  "AP Macroeconomics",
  "AP Microeconomics",
  "AP Music Theory",
  "AP Physics 1: Algebra-Based",
  "AP Physics 2: Algebra-Based",
  "AP Physics C: Electricity and Magnetism",
  "AP Physics C: Mechanics",
  "AP Psychology",
  "AP Spanish Language and Culture",
  "AP Spanish Literature and Culture",
  "AP Statistics",
  "AP 2-D Art and Design",
  "AP 3-D Art and Design",
  "AP Drawing",
  "AP United States Government and Politics",
  "AP United States History",
  "AP World History: Modern",
];

const IB_EXAMS = [
  "IB Language A: Literature",
  "IB Language A: Language and Literature",
  "IB Literature and Performance",
  "IB Classical Languages",
  "IB Language B",
  "IB Language Ab Initio",
  "IB Business Management",
  "IB Economics",
  "IB Geography",
  "IB Global Politics",
  "IB History",
  "IB Philosophy",
  "IB Psychology",
  "IB Social and Cultural Anthropology",
  "IB World Religions",
  "IB Environmental Systems and Societies",
  "IB Digital Society",
  "IB Brazilian Social Studies",
  "IB Turkey in the 20th Century",
  "IB World Arts and Cultures",
  "IB Biology",
  "IB Chemistry",
  "IB Physics",
  "IB Computer Science",
  "IB Design Technology",
  "IB Marine Science",
  "IB Astronomy",
  "IB Nature of Science",
  "IB Sports, Exercise and Health Science",
  "IB Mathematics: Analysis and Approaches",
  "IB Mathematics: Applications and Interpretation",
  "IB Dance",
  "IB Film",
  "IB Music",
  "IB Theatre",
  "IB Visual Arts",
  "IB Literary Art",
];

const COLLEGES = [
  "Mt. San Antonio College",
  "De Anza College",
  "Rio Hondo College",
  "Pasadena City College",
  "Santa Monica College",
  "Orange Coast College",
  "Irvine Valley College",
  "Fullerton College",
  "El Camino College",
  "Glendale Community College",
  "Saddleback College",
  "Chabot College",
  "Los Angeles City College",
  "San Diego Mesa College",
  "City College of San Francisco",
];

const UC_CAMPUSES = [
  "University of California, Los Angeles (UCLA)",
  "University of California, San Diego (UCSD)",
  "University of California, Berkeley (UCB)",
  "University of California, Irvine (UCI)",
  "University of California, Santa Barbara (UCSB)",
  "University of California, Riverside (UCR)",
  "University of California, Santa Cruz (UCSC)",
  "University of California, Davis (UCD)",
  "University of California, Merced (UCM)",
];

export default function Survey() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [apExams, setApExams] = useState([]);
  const [ibExams, setIbExams] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showMajorModal, setShowMajorModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    term: "",
    title: "",
    units: "",
    grade: "",
  });
  const [majorForm, setMajorForm] = useState({
    school: "",
    primary: "",
    alternate: "",
  });
  const [schoolSearch, setSchoolSearch] = useState("");
  const [editingSchoolIndex, setEditingSchoolIndex] = useState(null);

  const handleAddItem = (item, list, setList) => {
    if (item.trim() && !list.includes(item)) {
      setList([...list, item]);
    }
  };

  const handleRemoveItem = (item, list, setList) => {
    setList(list.filter((i) => i !== item));
  };

  const renderTags = (list, color, setList) => (
    <div className="flex flex-wrap gap-2 mt-4">
      {list.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 px-4 py-1 rounded-full font-semibold ${color}`}
        >
          <span>{item}</span>
          <X
            className="w-4 h-4 cursor-pointer"
            onClick={() => handleRemoveItem(item, list, setList)}
          />
        </div>
      ))}
    </div>
  );

  // Updated StepIndicator with checkmarks and connecting bars
  const StepIndicator = () => (
    <div className="flex flex-col items-start px-6 pt-10 space-y-8">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div
            key={i}
            className="flex items-center relative cursor-pointer"
            onClick={() => setCurrentStep(i)}
          >
            {/* Vertical connecting bar */}
            {i < steps.length - 1 && (
              <div
                className={`absolute left-4 top-8 h-10 w-1 transform -translate-x-1/2 ${
                  i < currentStep - 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            )}

            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full border-4 flex items-center justify-center mr-4
                ${
                  isCompleted
                    ? "bg-blue-500 border-blue-500"
                    : isActive
                    ? "border-blue-500 bg-white"
                    : "border-gray-300 bg-white"
                }
              `}
            >
              {isCompleted ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <div
                  className={`w-3 h-3 rounded-full ${
                    isActive ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            {/* Step label */}
            <span
              className={`text-sm font-semibold ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );

  const SearchInput = ({ placeholder, onEnter, suggestions }) => {
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState([]);

    const handleChange = (e) => {
      const val = e.target.value;
      setValue(val);
      setFiltered(
        val
          ? suggestions.filter((s) =>
              s.toLowerCase().includes(val.toLowerCase())
            )
          : []
      );
    };

    const handleSelect = (item) => {
      onEnter(item);
      setValue("");
      setFiltered([]);
    };

    return (
      <div className="relative">
        <input
          type="text"
          className="w-full border rounded-lg p-2 mt-4 shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) =>
            e.key === "Enter" && (onEnter(value), setValue(""), setFiltered([]))
          }
        />
        {filtered.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const handleConfirm = () => {
    // Here you could do final submission logic if needed
    navigate("/home");
  };

  return (
    <>
      <NavBar />
      <div className="flex">
        {/* Removed border-r from aside to get rid of vertical line */}
        <aside className="w-1/5 min-h-screen">
          <StepIndicator />
        </aside>

        <main className="flex-1 px-12 py-8">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold mb-1">AP Exams</h1>
                <p className="text-gray-600 mb-2">
                  Enter your passed AP exams (score of 3 or above)
                </p>
                <SearchInput
                  placeholder="Search AP exams..."
                  onEnter={(val) => handleAddItem(val, apExams, setApExams)}
                  suggestions={AP_EXAMS}
                />
                {renderTags(apExams, "bg-blue-200", setApExams)}
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">IB Exams</h1>
              <p className="text-gray-600 mb-2">
                Enter your passed IB exams (score of 5 or above)
              </p>
              <SearchInput
                placeholder="Search IB exams..."
                onEnter={(val) => handleAddItem(val, ibExams, setIbExams)}
                suggestions={IB_EXAMS}
              />
              {renderTags(ibExams, "bg-rose-300", setIbExams)}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Colleges Attended</h1>
              <p className="text-gray-600 mb-2">
                Enter all your community colleges attended
              </p>
              <SearchInput
                placeholder="Search colleges..."
                onEnter={(val) => handleAddItem(val, colleges, setColleges)}
                suggestions={COLLEGES}
              />
              {renderTags(colleges, "bg-green-200", setColleges)}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1 className="text-3xl font-bold mb-1">Courses</h1>
              <p className="text-gray-600 mb-6">
                Enter your completed UC transferable college courses
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl shadow-sm p-4 bg-white"
                  >
                    <p className="font-semibold text-md">{course.title}</p>
                    <p className="text-sm text-gray-600">
                      Units: {course.units}
                    </p>
                    <p className="text-sm text-gray-600">{course.term}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setCourseForm(course);
                          setCourses(courses.filter((_, i) => i !== idx));
                          setShowCourseModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setCourses(courses.filter((_, i) => i !== idx))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button
                  onClick={() => {
                    setCourseForm({
                      term: "",
                      title: "",
                      units: "",
                      grade: "",
                    });
                    setShowCourseModal(true);
                  }}
                  className="bg-red-400 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-red-500"
                >
                  Add a course
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h1 className="text-3xl font-bold mb-1">Schools</h1>
              <p className="text-gray-600 mb-4">
                Enter the UC campuses you plan to apply to (you can change these
                later on)
              </p>

              <div className="relative max-w-lg mb-6">
                <div className="absolute left-3 top-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm"
                  placeholder="Search UC campuses"
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                />
                {schoolSearch && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                    {UC_CAMPUSES.filter(
                      (s) =>
                        s.toLowerCase().includes(schoolSearch.toLowerCase()) &&
                        !schools.some((sch) => sch.school === s)
                    ).map((school, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setMajorForm({ school, primary: "", alternate: "" });
                          setShowMajorModal(true);
                          setSchoolSearch("");
                          setEditingSchoolIndex(null);
                        }}
                      >
                        {school}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {schools.map((school, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl shadow-sm p-4 bg-purple-100"
                  >
                    <p className="font-semibold text-blue-700 text-sm mb-2">
                      {school.school}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Primary Major:</span>{" "}
                      {school.primary}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Alternate Major:</span>{" "}
                      {school.alternate}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setMajorForm(school);
                          setEditingSchoolIndex(idx);
                          setShowMajorModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          setSchools(schools.filter((_, i) => i !== idx))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Summary</h1>

              <section className="mb-6">
                <h2 className="font-semibold text-lg mb-2">AP Exams</h2>
                {apExams.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {apExams.map((exam, i) => (
                      <li key={i}>{exam}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No AP exams added.</p>
                )}
              </section>

              <section className="mb-6">
                <h2 className="font-semibold text-lg mb-2">IB Exams</h2>
                {ibExams.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {ibExams.map((exam, i) => (
                      <li key={i}>{exam}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No IB exams added.</p>
                )}
              </section>

              <section className="mb-6">
                <h2 className="font-semibold text-lg mb-2">
                  Colleges Attended
                </h2>
                {colleges.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {colleges.map((college, i) => (
                      <li key={i}>{college}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No colleges added.</p>
                )}
              </section>

              <section className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Courses</h2>
                {courses.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {courses.map((course, i) => (
                      <li key={i}>
                        {course.term} - {course.title} ({course.units} units),
                        Grade: {course.grade}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No courses added.</p>
                )}
              </section>

              <section className="mb-6">
                <h2 className="font-semibold text-lg mb-2">Schools & Majors</h2>
                {schools.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {schools.map((school, i) => (
                      <li key={i}>
                        <span className="font-semibold">{school.school}</span> —
                        Primary: {school.primary}, Alternate: {school.alternate}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No schools or majors added.</p>
                )}
              </section>

              <button
                onClick={handleConfirm}
                className="bg-green-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          )}
        </main>

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

        {showMajorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (editingSchoolIndex !== null) {
                      const restored = [...schools];
                      restored.splice(editingSchoolIndex, 0, majorForm);
                      setSchools(restored);
                    }
                    setShowMajorModal(false);
                    setEditingSchoolIndex(null);
                    setMajorForm({ school: "", primary: "", alternate: "" });
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  <X />
                </button>
              </div>

              <h2 className="text-center text-blue-700 font-bold text-lg mb-6">
                {majorForm.school}
              </h2>

              <div className="mb-4">
                <p className="font-semibold mb-1">Primary Major</p>
                <input
                  type="text"
                  placeholder="Search for your primary major"
                  className="w-full border p-2 rounded"
                  value={majorForm.primary}
                  onChange={(e) =>
                    setMajorForm({ ...majorForm, primary: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-1">Alternative Major</p>
                <input
                  type="text"
                  placeholder="Search for your alternate major"
                  className="w-full border p-2 rounded"
                  value={majorForm.alternate}
                  onChange={(e) =>
                    setMajorForm({ ...majorForm, alternate: e.target.value })
                  }
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    if (
                      majorForm.school &&
                      majorForm.primary &&
                      majorForm.alternate
                    ) {
                      const updated = [...schools];
                      if (editingSchoolIndex !== null) {
                        updated.splice(editingSchoolIndex, 0, majorForm);
                      } else {
                        updated.push(majorForm);
                      }
                      setSchools(updated);
                      setShowMajorModal(false);
                      setMajorForm({ school: "", primary: "", alternate: "" });
                      setEditingSchoolIndex(null);
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
