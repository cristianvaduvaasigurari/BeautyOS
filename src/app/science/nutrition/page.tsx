import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function ScienceNutritionPage() {
  const article = getEditorialArticle("science-nutrition", "Science", "nutrition");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
