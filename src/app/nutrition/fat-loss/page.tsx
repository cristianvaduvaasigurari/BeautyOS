import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function FatLossNutritionPage() {
  const article = getEditorialArticle("nutrition-fat-loss", "Nutrition", "fat-loss");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/nutrition" 
      backLabel="Nutrition Hub" 
    />
  );
}
