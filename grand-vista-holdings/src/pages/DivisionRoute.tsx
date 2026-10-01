import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getDivision } from "../data/divisions";

export function DivisionRoute() {
  const { slug } = useParams();
  const division = slug ? getDivision(slug) : undefined;

  useEffect(() => {
    if (division) {
      window.location.assign(division.site);
    }
  }, [division]);

  if (!division) {
    return <Navigate to="/divisions" replace />;
  }

  return null;
}
