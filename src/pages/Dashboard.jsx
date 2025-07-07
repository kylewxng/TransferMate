import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../firebase/srcfirebase";
import { useRef } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const howItWorksRef = useRef(null);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Sticky Navbar */}
      <header className="sticky top-0 bg-white z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img
              src="/images/app-logo.png"
              alt="Logo"
              className="h-6 w-6 mr-2"
            />
            <span className="text-lg font-semibold">TransferMate</span>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-sm font-medium">
            <button
              className="hover:text-gray-600"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button className="hover:text-gray-600">Courses</button>
            <button className="hover:text-gray-600">Planner</button>
            <button className="hover:text-gray-600">About</button>
          </div>

          <button
            className="bg-black text-white text-sm px-7 py-3.5 rounded-full hover:opacity-90"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  alert("Logged out successfully");
                  navigate("/");
                })
                .catch((error) => {
                  console.error("Error signing out:", error);
                });
            }}
          >
            Log out
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-3xl mx-auto text-center px-6 py-20">
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
      </main>

      {/* How it works Section */}
      <section
        className="max-w-5xl mx-auto px-6 pb-24"
        style={{ scrollMarginTop: "100px" }}
        ref={howItWorksRef}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">
          How does TransferMate work?
        </h2>

        <div className="bg-white border rounded-xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Steps */}
          {[1, 2, 3, 4].map((step) => (
            <>
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
            </>
          ))}
        </div>
      </section>
    </div>
  );
}
