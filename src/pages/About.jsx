import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-inter overflow-y-auto">
      <NavBar />
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">
        {/* Our Mission */}
        <motion.div
          key="step-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-3">Our Mission</h1>
          <p className="text-gray-700 mb-8 max-w-3xl">
            With <strong>TransferMate</strong>, we're on a mission to provide a
            web platform for transfer students, making the transfer process
            easier for community college students. We want to take off the
            stress of researching what courses to take and when to take them, as
            we understand how stressful that process can be.
          </p>

          {/* Icon Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="flex items-start gap-3">
              <img
                src="../images/arrow.png"
                alt="Easy to use"
                className="h-4 w-4 mt-1"
              />
              <div>
                <h3 className="font-semibold mb-1">Easy to use</h3>
                <p className="text-sm text-gray-700">
                  Other existing college course schedule apps have too many
                  cluttered features, so we wanted to make our app easier to
                  navigate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <img
                src="../images/box.png"
                alt="All in one"
                className="h-4 w-4 mt-1"
              />
              <div>
                <h3 className="font-semibold mb-1">All in one</h3>
                <p className="text-sm text-gray-700">
                  Everything that we needed as transfer students, we included on
                  our app, including course scheduling, major prep tracking,
                  IGETC tracking, and smart AI course planning.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why We Built It Section */}
        <h2 className="text-2xl font-bold mb-6">Why We Built It</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow border px-6 py-6 transition transform hover:shadow-lg hover:shadow-indigo-200 duration-300"
          >
            <img
              src="../images/lightbulb.png"
              alt="The Spark Icon"
              className="h-4 w-4 mb-2"
            />
            <h3 className="font-semibold text-lg mb-2">The Spark</h3>
            <p className="text-sm text-gray-700">
              As community college students, we found the transfer process
              confusing and poorly supported. Outdated tools and limited
              counselor knowledge made it hard to know what classes to take.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow border px-6 py-6 transition transform hover:shadow-lg hover:shadow-indigo-200 duration-300"
          >
            <img
              src="../images/tag.png"
              alt="The Process Icon"
              className="h-4 w-4 mb-2"
            />
            <h3 className="font-semibold text-lg mb-2">The Process</h3>
            <p className="text-sm text-gray-700">
              Most planning apps focus on associate degrees, not transfers. We
              set out to build a smarter solution, one that helps students take
              only the courses they truly need.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow border px-6 py-6 transition transform hover:shadow-lg hover:shadow-indigo-200 duration-300"
          >
            <img
              src="../images/rocket.png"
              alt="The Launch Icon"
              className="h-4 w-4 mb-2"
            />
            <h3 className="font-semibold text-lg mb-2">The Launch</h3>
            <p className="text-sm text-gray-700">
              We created TransferMate to make transferring clearer and more
              efficient, with tools built specifically for California community
              college students.
            </p>
          </motion.div>
        </div>

        {/* Meet the Team Section*/}
        <motion.div
          key="step-1"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mt-20 mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card Template */}
            {[
              {
                name: "Kyle Wong",
                title: "Co-Founder",
                profilePic: "../images/kyle.jpg",
                desc: "Hey everyone, I'm Kyle a 1-year transfer from Mt. SAC and a UCLA admit for Data Theory, B.S. I really hope this app helps make the transfer process a little clearer and easier for you, thanks so much for checking our work out!",
              },
              {
                name: "Bradley Co",
                title: "Co-Founder",
                profilePic: "../images/pfp.png",
              },
              {
                name: "Camden Simardjaja",
                title: "Co-Founder",
                profilePic: "../images/pfp.png",
              },
              {
                name: "Siwoo Chung",
                title: "Co-Founder",
                profilePic: "../images/pfp.png",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow border px-6 py-6 text-center transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-200 duration-300"
              >
                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md"
                />
                <h3 className="font-semibold text-base">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.title}</p>
                {member.desc && (
                  <p className="text-sm text-gray-700 text-left">
                    {member.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key="step-2"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <section className="max-w-3xl mx-auto px-6 pt-12 pb-24 font-inter mt-10">
            <h2 className="text-center text-2xl font-bold mb-1">
              Got a feature idea? Want to collaborate?
            </h2>
            <p className="text-center text-sm text-gray-500 mb-8">
              We'd love to hear from you. Reach out to us below.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* Form Section */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  maxLength={300}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded shadow hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </form>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
