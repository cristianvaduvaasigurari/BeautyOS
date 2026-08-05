import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function ScienceLongevityPage() {
  const article = getEditorialArticle("science-longevity", "Science", "longevity");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
