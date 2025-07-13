import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/srcfirebase";

export default function Home() {
  const { currentUser, firstName } = useAuth();

  return (
    <>
      <NavBar />
      <h1 className="text-2xl font-bold">
        {firstName ? `Welcome back, ${firstName}!` : "Welcome!"}
      </h1>
    </>
  );
}
