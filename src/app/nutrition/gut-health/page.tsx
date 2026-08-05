import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function GutHealthPage() {
  const article = getEditorialArticle("nutrition-gut-health", "Nutrition", "gut-health");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/nutrition" 
      backLabel="Nutrition Hub" 
    />
  );
}
