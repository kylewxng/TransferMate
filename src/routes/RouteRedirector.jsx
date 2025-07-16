import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";

export default function RouteRedirector() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const decideRedirect = async () => {
      if (currentUser === undefined) return; // wait for auth state to resolve

      if (!currentUser) {
        navigate("/signup", { replace: true });
        setChecking(false);
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const hasSurveyData =
            Array.isArray(data.schools) &&
            data.schools.length > 0 &&
            Array.isArray(data.courses) &&
            data.courses.length > 0;

          navigate(hasSurveyData ? "/home" : "/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        navigate("/signup", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    decideRedirect();
  }, [currentUser, navigate]);

  if (checking || currentUser === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }
}
