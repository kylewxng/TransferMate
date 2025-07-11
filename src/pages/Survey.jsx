// Survey.jsx
import { useState } from "react";
import { X, Check } from "lucide-react"; // Added Check icon import
import NavBar from "../components/NavBar";
import AppRouter from "../routes/AppRouter";
import { useNavigate } from "react-router-dom";

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
];

const UC_CAMPUSES = [
  "University of California, Los Angeles (UCLA)",
  "University of California, San Diego (UCSD)",
  "University of California, Berkeley (UCB)",
  "University of California, Irvine (UCI)",
  "University of California, Santa Barbara (UCSB)",
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
    <div className="flex flex-col items-center px-4 pt-8">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div
            key={i}
            className="flex flex-col items-center cursor-pointer relative"
            onClick={() => setCurrentStep(i)}
            style={{ zIndex: 10 }}
          >
            {/* Connecting bar */}
            {i < steps.length - 1 && (
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 top-6 h-12 w-1 ${
                  i < currentStep - 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
                style={{ zIndex: 0 }}
              />
            )}

            {/* Circle with border and content */}
            <div
              className={`w-8 h-8 rounded-full border-4 flex items-center justify-center
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

            <span className="text-xs mt-1 text-center w-20 leading-tight select-none">
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
              <h1 className="text-2xl font-bold mb-1">Courses</h1>
              <p className="text-gray-600 mb-2">
                Enter your completed UC transferable college courses
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((course, idx) => (
                  <div key={idx} className="border rounded p-4 shadow-sm">
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-gray-500">
                      {course.term} • {course.units} Units • Grade:{" "}
                      {course.grade}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCourseModal(true)}
                className="mt-4 bg-red-300 text-white px-4 py-2 rounded"
              >
                Add a course
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Schools/Majors</h1>
              <p className="text-gray-600 mb-2">
                Enter the UC campuses and the majors you plan to apply to
              </p>
              <div className="space-y-4">
                {schools.map((school, idx) => (
                  <div key={idx} className="border rounded p-4 shadow-sm">
                    <p className="font-semibold text-blue-600">
                      {school.school}
                    </p>
                    <p className="text-sm">Primary: {school.primary}</p>
                    <p className="text-sm">Alternate: {school.alternate}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowMajorModal(true)}
                className="mt-4 bg-purple-300 text-white px-4 py-2 rounded"
              >
                Add a school/major
              </button>
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
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-lg font-bold mb-4">Add Course</h2>
              <input
                className="w-full mb-2 border p-2 rounded"
                placeholder="Term"
                onChange={(e) =>
                  setCourseForm({ ...courseForm, term: e.target.value })
                }
              />
              <input
                className="w-full mb-2 border p-2 rounded"
                placeholder="Course Title"
                onChange={(e) =>
                  setCourseForm({ ...courseForm, title: e.target.value })
                }
              />
              <input
                className="w-full mb-2 border p-2 rounded"
                placeholder="Units"
                onChange={(e) =>
                  setCourseForm({ ...courseForm, units: e.target.value })
                }
              />
              <input
                className="w-full mb-4 border p-2 rounded"
                placeholder="Grade"
                onChange={(e) =>
                  setCourseForm({ ...courseForm, grade: e.target.value })
                }
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setCourses([...courses, courseForm]);
                    setShowCourseModal(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showMajorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-lg font-bold mb-4">Add School & Majors</h2>
              <SearchInput
                placeholder="School"
                suggestions={UC_CAMPUSES}
                onEnter={(val) => setMajorForm({ ...majorForm, school: val })}
              />
              <input
                className="w-full my-2 border p-2 rounded"
                placeholder="Primary Major"
                onChange={(e) =>
                  setMajorForm({ ...majorForm, primary: e.target.value })
                }
              />
              <input
                className="w-full mb-4 border p-2 rounded"
                placeholder="Alternate Major"
                onChange={(e) =>
                  setMajorForm({ ...majorForm, alternate: e.target.value })
                }
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowMajorModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSchools([...schools, majorForm]);
                    setShowMajorModal(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
