import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/srcfirebase";
import React, { createContext, useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [isFirestoreVerified, setIsFirestoreVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsFirestoreVerified(false);
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            const name =
              docSnap.data().firstName || user.displayName?.split(" ")[0] || "";
            setFirstName(name);
            setIsFirestoreVerified(true);
          } else {
            await auth.signOut();
            setFirstName("");
          }
        } catch (err) {
          console.error("Failed to fetch first name:", err);
        }
      } else {
        setFirstName("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userLoggedIn: !!currentUser,
        firstName,
        isFirestoreVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
