import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";
import { motion } from "framer-motion";
import { computeUnitsFromData } from "../utilities/computeUnits";
import { CountdownTimer } from "../utilities/countdown";

export default function Home() {
  const { currentUser, firstName } = useAuth();
  const [unitData, setUnitData] = useState({
    ucCourses: { completed: 0, total: 0 },
    apExams: { completed: 0, total: 0 },
    ibExams: { completed: 0, total: 0 },
    miscUnits: 0,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!currentUser) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const computed = computeUnitsFromData(docSnap.data());
        setUnitData(computed);
      }
    };

    fetchCourseData();
  }, [currentUser]);

  const overallCompleted =
    unitData.ucCourses.completed +
    unitData.apExams.completed +
    unitData.ibExams.completed +
    unitData.miscUnits;

  const overallTotal =
    unitData.ucCourses.total +
    unitData.apExams.total +
    unitData.ibExams.total +
    unitData.miscUnits;

  return (
    <div className="min-h-screen bg-white font-inter">
      <NavBar />
      <motion.div
        key="step-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-6 px-12 py-6 ml-12">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">
              {firstName ? `Welcome back, ${firstName}!` : "Welcome!"}
            </h1>
            <p className="text-gray-600 mb-6">
              You're transfer ready for 2 out of your 6 schools!
            </p>

            {/* UC Completed Units Summary */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">
                UC Completed Units Summary (Semester)
              </h2>
              <table className="w-full text-sm text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-indigo-600">Type</th>
                    <th className="px-4 py-2 text-indigo-600">
                      In Progress/Planned
                    </th>
                    <th className="px-4 py-2 text-indigo-600">Completed</th>
                    <th className="px-4 py-2 text-indigo-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">
                      UC-Transferable Courses
                    </td>
                    <td className="border px-4 py-2">0.00</td>
                    <td className="border px-4 py-2">
                      {unitData.ucCourses.completed.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {unitData.ucCourses.total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">AP Exams</td>
                    <td className="border px-4 py-2">0.00</td>
                    <td className="border px-4 py-2">
                      {unitData.apExams.completed.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {unitData.apExams.total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">IB Exams</td>
                    <td className="border px-4 py-2">0.00</td>
                    <td className="border px-4 py-2">
                      {unitData.ibExams.completed.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {unitData.ibExams.total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Miscellaneous</td>
                    <td className="border px-4 py-2">0.00</td>
                    <td className="border px-4 py-2">
                      {unitData.miscUnits.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {unitData.miscUnits.toFixed(2)}
                    </td>
                  </tr>

                  <tr className="font-semibold bg-gray-50">
                    <td className="border px-4 py-2">Overall Total:</td>
                    <td className="border px-4 py-2">0.00</td>
                    <td className="border px-4 py-2">
                      {overallCompleted.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {overallTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* UC GE Requirements */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="font-semibold text-indigo-600">
                UC 7-Course Pattern
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Minimum GE requirement for UC transfer eligibility
              </p>
              <details className="border px-4 py-2 rounded cursor-pointer">
                <summary className="cursor-pointer font-medium text-gray-800"></summary>
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <p>
                    Complete the following <strong>7-course pattern</strong> by
                    the end of the spring term prior to fall enrollment at UC:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Two transferable courses in English composition</li>
                    <li>
                      One transferable course in mathematical concepts and
                      quantitative reasoning
                    </li>
                    <li>
                      Four transferable college courses chosen from at least two
                      of the following subject areas:
                      <ul className="list-disc list-inside ml-5">
                        <li>arts and humanities</li>
                        <li>social and behavioral sciences</li>
                        <li>physical and biological sciences</li>
                      </ul>
                    </li>
                  </ul>
                  <p className="italic text-gray-600">For example:</p>
                  <ul className="list-disc list-inside italic text-gray-600 ml-5">
                    <li>3 chemistry courses and 1 history course</li>
                    <li>
                      2 sociology courses, 1 physics course, and 1 art history
                      course
                    </li>
                    <li>1 biology course and 3 literature courses</li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-indigo-600">IGETC 2025-2026</h2>
              <p className="text-sm text-gray-600 mb-2">
                Program to fulfill all lower-division GE requirements for UCs
              </p>
              <details className="border px-4 py-2 rounded cursor-pointer">
                <summary className="cursor-pointer font-medium text-gray-800"></summary>
                <div className="mt-4 text-sm text-gray-700">
                  <table className="table-auto w-full border border-gray-300 text-left text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border">Subject area</th>
                        <th className="px-4 py-2 border">Required courses</th>
                        <th className="px-4 py-2 border">Units required</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>1. English Communication</strong>
                          <br />
                          <span className="text-gray-600">
                            One course in English composition and one course in
                            critical thinking/English composition.
                          </span>
                        </td>
                        <td className="border px-4 py-2">2 courses</td>
                        <td className="border px-4 py-2">
                          6 semester units or 8–10 quarter units
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>
                            2. Mathematical Concepts and Quantitative Reasoning
                          </strong>
                        </td>
                        <td className="border px-4 py-2">1 course</td>
                        <td className="border px-4 py-2">
                          3 semester units or 4–5 quarter units
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>3. Arts and Humanities</strong>
                          <br />
                          <span className="text-gray-600">
                            Three courses with at least one from the arts and
                            one from the humanities.
                          </span>
                        </td>
                        <td className="border px-4 py-2">3 courses</td>
                        <td className="border px-4 py-2">
                          9 semester units or 12–15 quarter units
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>4. Social and Behavioral Sciences</strong>
                          <br />
                          <span className="text-gray-600">
                            Two courses from at least two disciplines or in an
                            interdisciplinary sequence.
                          </span>
                        </td>
                        <td className="border px-4 py-2">2 courses</td>
                        <td className="border px-4 py-2">
                          6 semester units or 8–10 quarter units
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>5. Physical and Biological Sciences</strong>
                          <br />
                          <span className="text-gray-600">
                            One physical science course and one biological
                            science course, at least one of which includes a
                            laboratory.
                          </span>
                        </td>
                        <td className="border px-4 py-2">2 courses</td>
                        <td className="border px-4 py-2">
                          7–9 semester units or 9–12 quarter units
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>6. Language Other than English</strong>
                          <br />
                          <span className="text-gray-600">
                            Proficiency equivalent to two years of high school
                            courses in the same language.
                          </span>
                        </td>
                        <td className="border px-4 py-2">Proficiency</td>
                        <td className="border px-4 py-2">Proficiency</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">
                          <strong>7. Ethnic Studies</strong>
                        </td>
                        <td className="border px-4 py-2">1 course</td>
                        <td className="border px-4 py-2">
                          3 semester units or 4–5 quarter units
                        </td>
                      </tr>
                      <tr className="font-semibold bg-gray-50">
                        <td className="border px-4 py-2">Total:</td>
                        <td className="border px-4 py-2">11 courses</td>
                        <td className="border px-4 py-2">34 semester units</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[300px]">
            <div className="bg-white shadow rounded p-4 mb-4">
              <p className="font-semibold text-sm mb-1">
                Countdown to UC App Deadline
              </p>
              <CountdownTimer />
            </div>

            <div className="bg-white shadow rounded p-4 mb-4">
              <p className="font-semibold mb-2">Tools & Resources</p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>
                  <a href="https://assist.org/">assist.org</a>
                  <br />
                  <span className="text-gray-500">
                    Official repository of articulation for California's public
                    universities
                  </span>
                </li>
                <li>
                  <a href="https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-transfer/personal-insight-questions.html">
                    UC PIQs
                  </a>
                  <br />
                  <span className="text-gray-500">
                    View the UC essay prompts part of their application process
                  </span>
                </li>
                <li>
                  <a href="https://admission.universityofcalifornia.edu/tuition-financial-aid/estimate-your-aid.html">
                    UC Financial Aid Calculator
                  </a>
                  <br />
                  <span className="text-gray-500">
                    Estimate how much it will cost to attend UC for one year
                  </span>
                </li>
                <li>
                  <a href="https://www.universityofcalifornia.edu/about-us/information-center/transfers-major">
                    UC Transfer Majors Stats
                  </a>
                  <br />
                  <span className="text-gray-500">
                    Website for all necessary UC application data
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow rounded p-4">
              <p className="font-semibold mb-1">Important Deadlines</p>
              <p className="text-xs text-gray-600">
                <strong>July 1–31, 2024</strong>
                <br />
                Winter/spring 2025 application filing period for Merced,
                Riverside and Santa Cruz.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
