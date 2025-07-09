import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

// Full AP exams list from your provided list
const apExamOptions = [
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

// Full IB exams list from your provided list
const ibExamOptions = [
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

export default function Survey() {
  const navigate = useNavigate();

  const [apInput, setApInput] = useState("");
  const [ibInput, setIbInput] = useState("");
  const [apExams, setApExams] = useState([]);
  const [ibExams, setIbExams] = useState([]);

  const handleKeyPress = (e, input, setInput, list, setList) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !list.includes(trimmed)) {
        setList([...list, trimmed]);
      }
      setInput("");
    }
  };

  const getSuggestions = (input, options) => {
    return input.length > 0
      ? options.filter(
          (opt) =>
            opt.toLowerCase().includes(input.toLowerCase()) &&
            !apExams.includes(opt) &&
            !ibExams.includes(opt)
        )
      : [];
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Navbar */}

      <NavBar />

      {/* Main Scrollable Content */}
      <div className="max-w-3xl mx-auto p-6 space-y-10">
        {/* Surrounding Container for the Survey Sections */}
        <div className="border border-gray-300 rounded-lg p-6 shadow-md bg-gray-50">
          {/* AP Exams Section */}
          <section>
            <h2 className="text-2xl font-bold mb-2">AP Exams</h2>
            <p className="mb-2">
              Enter your passed AP exams (score of 3 or above)
            </p>
            <input
              type="text"
              placeholder="Search AP exam"
              value={apInput}
              onChange={(e) => setApInput(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPress(e, apInput, setApInput, apExams, setApExams)
              }
              className="w-full p-2 border rounded mb-2"
            />
            {/* Suggestions */}
            {getSuggestions(apInput, apExamOptions).length > 0 && (
              <ul className="bg-gray-100 rounded p-2 mb-2 max-h-40 overflow-auto">
                {getSuggestions(apInput, apExamOptions).map((exam, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:bg-gray-200 p-1 rounded"
                    onClick={() => {
                      setApExams([...apExams, exam]);
                      setApInput("");
                    }}
                  >
                    {exam}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {apExams.map((exam, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {exam}
                </span>
              ))}
            </div>
          </section>

          <hr className="my-6" />

          {/* IB Exams Section */}
          <section>
            <h2 className="text-2xl font-bold mb-2">IB Exams</h2>
            <p className="mb-2">
              Enter your passed IB exams (score of 5 or above)
            </p>
            <input
              type="text"
              placeholder="Search IB exam"
              value={ibInput}
              onChange={(e) => setIbInput(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPress(e, ibInput, setIbInput, ibExams, setIbExams)
              }
              className="w-full p-2 border rounded mb-2"
            />
            {/* Suggestions */}
            {getSuggestions(ibInput, ibExamOptions).length > 0 && (
              <ul className="bg-gray-100 rounded p-2 mb-2 max-h-40 overflow-auto">
                {getSuggestions(ibInput, ibExamOptions).map((exam, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:bg-gray-200 p-1 rounded"
                    onClick={() => {
                      setIbExams([...ibExams, exam]);
                      setIbInput("");
                    }}
                  >
                    {exam}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {ibExams.map((exam, idx) => (
                <span
                  key={idx}
                  className="bg-red-200 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {exam}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* More sections like Courses go here */}
      </div>
    </div>
  );
}
