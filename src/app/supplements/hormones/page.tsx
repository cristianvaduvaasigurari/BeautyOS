import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function HormonesSupplementsPage() {
  const article = getEditorialArticle("supplements-hormones", "Supplements", "hormones");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Library" 
    />
  );
}
