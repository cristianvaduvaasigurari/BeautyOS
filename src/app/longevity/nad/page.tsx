import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function NADLongevityPage() {
  const article = getEditorialArticle("longevity-nad", "Longevity", "nad");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/longevity" 
      backLabel="Longevity Hub" 
    />
  );
}
