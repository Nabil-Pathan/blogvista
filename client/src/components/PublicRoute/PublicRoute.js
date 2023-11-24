import React from "react";
import { Route , Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

function PublicRoute({ element }) {
    const { user } = useUserContext();
    return user ? <Navigate to="/allposts" /> : element;
  }

export default PublicRoute