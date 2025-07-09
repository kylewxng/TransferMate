import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useRef } from "react";
import { motion } from "framer-motion"; // 👈 added this
import NavBar from "../components/NavBar";

export default function Dashboard() {
  const navigate = useNavigate();
  const howItWorksRef = useRef(null);

  return (
    <div className="min-h-screen bg-white font-inter">
      <NavBar />

      {/* Hero Section */}
      <motion.main
        className="max-w-3xl mx-auto text-center px-6 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Plan your college transfer
          <br />
          with confidence
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Track your progress towards transferring and take control of your
          future, one course at a time.
        </p>
        <div className="flex justify-center gap-4 mb-20">
          <button
            className="bg-indigo-600 text-white px-7 py-3 rounded-full shadow-md text-base hover:opacity-90"
            onClick={() => navigate("/survey")}
          >
            Start now
          </button>
          <button
            className="border border-black px-6 py-3 rounded-full text-base hover:bg-gray-50"
            onClick={() => {
              howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </button>
        </div>

        {/* Carousel Placeholder */}
        <div className="bg-gray-200 h-80 flex items-center justify-center rounded shadow mb-10">
          <p className="text-sm text-gray-700">Infinite carousel app demo...</p>
        </div>
      </motion.main>

      {/* How it works Section */}
      <motion.section
        className="max-w-5xl mx-auto px-6 pb-24"
        style={{ scrollMarginTop: "100px" }}
        ref={howItWorksRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">
          How does TransferMate work?
        </h2>

        <div className="bg-white border rounded-xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-full bg-purple-300 shadow-md flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                  {step}
                </div>
                <div>
                  {step === 1 && (
                    <>
                      <h3 className="font-semibold mb-1 text-lg">
                        Select your target schools
                      </h3>
                      <p className="text-sm text-gray-600">
                        Choose the UCs you want to transfer to and your
                        primary/secondary majors.
                      </p>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h3 className="font-semibold mb-1 text-lg">
                        Track your completed courses
                      </h3>
                      <p className="text-sm text-gray-600">
                        Keep a record of your progress and transferable
                        coursework.
                      </p>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h3 className="font-semibold mb-1 text-lg">
                        View your progress
                      </h3>
                      <p className="text-sm text-gray-600">
                        Check the Dashboard tab to see how close you are to
                        meeting each school’s GE, major prep, and elective
                        requirements.
                      </p>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h3 className="font-semibold mb-1 text-lg">
                        Generate your personalized plan
                      </h3>
                      <p className="text-sm text-gray-600">
                        Use the AI Planner to generate semester/quarter course
                        plans that maximize course overlap across schools and
                        majors.
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gray-200 h-56 rounded shadow-sm flex items-center justify-center">
                <p className="text-xs text-gray-500">Screenshot of feature</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
