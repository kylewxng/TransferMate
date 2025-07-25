import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src="/images/app-logo.png" alt="Logo" className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">TransferMate</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-sm font-medium">
          <button
            className="hover:text-gray-600"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => navigate("/courses")}
          >
            Courses
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => navigate("/planner")}
          >
            Planner
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => navigate("/about")}
          >
            About
          </button>
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
  );
}

export default NavBar;
