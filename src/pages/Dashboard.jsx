import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";
import { useAuth } from "../contexts/authContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const howItWorksRef = useRef(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const videoRef = useRef(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const hasSchools =
        Array.isArray(data?.schools) && data.schools.length > 0;
      const hasCourses =
        Array.isArray(data?.courses) && data.courses.length > 0;

      if (hasSchools && hasCourses) {
        navigate("/home", { replace: true });
      } else {
        setLoading(false); // Only stop loading if survey needed
      }
    };

    checkUser();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking your data...
      </div>
    );
  }

  const testimonials = [
    {
      quote:
        "TransferMate helped me organize my coursework better than any counselor ever could. The layout made it easy to visualize what I still needed, and I was able to confidently apply to five UCs knowing I met the major prep for each.",
      name: "Sofia G.",
    },
    {
      quote:
        "As a working student, I didn’t have time to track every requirement manually. TransferMate did the heavy lifting for me. The planner let me spot gaps early and fix them before applying to UCLA.",
      name: "Jason L.",
    },
    {
      quote:
        "I used to feel totally overwhelmed. Between GE, IGETC, and major prep, I never knew what I was missing. This platform gave me peace of mind and kept me on track to transfer in two years.",
      name: "Renee T.",
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const current = testimonials[testimonialIndex];

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
        <div className="relative max-w-3xl mx-auto mb-12 px-4">
          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-12 text-center">
            {/* Quotation Icon */}
            <div className="flex mb-4 ml-4">
              <img
                src="../images/quote.png" // ← Replace this path with your own icon
                alt="Quote icon"
                className="w-6 h-6"
              />
            </div>

            {/* Quote Text */}
            <p className="text-base text-gray-800 mb-6 leading-relaxed">
              {current.quote}
            </p>

            {/* Name */}
            <p className="text-sm text-gray-600 font-semibold">
              — {current.name}
            </p>
          </div>

          {/* Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
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
                        Fill out the starting form
                      </h3>
                      <p className="text-sm text-gray-600">
                        Input your passed exams, community colleges, courses,
                        and schools/majors you plan to transfer to.
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
                        Check the Home tab to see how close you are to meeting
                        each school’s GE, major prep, and elective requirements.
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
              {step === 1 ? (
                <div className="relative w-full aspect-video rounded shadow-sm overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded ml-2 mt-2"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/step1-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={handleFullscreen}
                    className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded hover:bg-opacity-75 transition"
                  >
                    Fullscreen
                  </button>
                </div>
              ) : (
                <div className="bg-gray-200 h-56 rounded shadow-sm flex items-center justify-center">
                  <p className="text-xs text-gray-500">Screenshot of feature</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
