import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";
import { motion } from "framer-motion";

export default function Home() {
  const { currentUser, firstName } = useAuth();
  const [unitData, setUnitData] = useState({
    ucCourses: { completed: 0, total: 0 },
    apExams: { completed: 0, total: 0 },
    ibExams: { completed: 0, total: 0 },
  });

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUnitData({
            ucCourses: {
              completed: data.ucTransferableCompleted || 0,
              total: data.ucTransferableTotal || 0,
            },
            apExams: {
              completed: data.apCompleted || 0,
              total: data.apTotal || 0,
            },
            ibExams: {
              completed: data.ibCompleted || 0,
              total: data.ibTotal || 0,
            },
          });
        }
      };
      fetchData();
    }
  }, [currentUser]);

  const overallCompleted =
    unitData.ucCourses.completed +
    unitData.apExams.completed +
    unitData.ibExams.completed;
  const overallTotal =
    unitData.ucCourses.total + unitData.apExams.total + unitData.ibExams.total;

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
                <summary className="cursor-pointer"></summary>
              </details>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-indigo-600">IGETC 2025-2026</h2>
              <p className="text-sm text-gray-600 mb-2">
                Program to fulfill all lower-division GE requirements for UCs
              </p>
              <details className="border px-4 py-2 rounded cursor-pointer">
                <summary className="cursor-pointer"></summary>
              </details>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[300px]">
            <div className="bg-white shadow rounded p-4 mb-4">
              <p className="font-semibold text-sm mb-1">
                Countdown to UC App Deadline
              </p>
              <div className="text-3xl font-bold">06:21:04</div>
              <p className="text-xs text-gray-600">
                months&nbsp;&nbsp;&nbsp;&nbsp;hours&nbsp;&nbsp;&nbsp;&nbsp;days
              </p>
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
