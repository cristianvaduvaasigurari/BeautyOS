import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function HormonesSciencePage() {
  const article = getEditorialArticle("science-hormones", "Science", "hormones");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
