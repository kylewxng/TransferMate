import { useNavigate, useLocation } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const safeNavigate = (path) => {
    if (!isDashboard) {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 bg-white z-50">
      <nav className="w-full px-8 py-4 flex items-center justify-between fixed top-0 left-0 z-50 bg-white">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => safeNavigate("/home")}
        >
          <img src="/images/app-logo.png" alt="Logo" className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">TransferMate</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-sm font-medium">
          <button
            className="hover:text-gray-600"
            onClick={() => safeNavigate("/home")}
          >
            Home
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => safeNavigate("/courses")}
          >
            Courses
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => safeNavigate("/planner")}
          >
            Planner
          </button>
          <button
            className="hover:text-gray-600"
            onClick={() => safeNavigate("/about")}
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
      <div className="h-20" />
    </header>
  );
}

export default NavBar;
