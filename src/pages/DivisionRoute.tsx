import { Navigate, useParams } from "react-router-dom";
import { DivisionPage } from "../components/DivisionPage";
import { Seo } from "../components/Seo";
import { getDivision } from "../data/divisions";

export function DivisionRoute() {
  const { slug } = useParams();
  const division = slug ? getDivision(slug) : undefined;

  if (!division) {
    return <Navigate to="/divisions" replace />;
  }

  return (
    <>
      <Seo
        title={`${division.name} — Lee Ann Holdings`}
        description={division.blurb}
        path={division.to}
      />
      <DivisionPage division={division} />
    </>
  );
}
