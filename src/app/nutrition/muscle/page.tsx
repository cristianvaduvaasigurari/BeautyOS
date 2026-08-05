import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function MuscleNutritionPage() {
  const article = getEditorialArticle("nutrition-muscle", "Nutrition", "muscle");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/nutrition" 
      backLabel="Nutrition Hub" 
    />
  );
}
