import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function SleepOptimizationPage() {
  const article = getEditorialArticle("guides-sleep-optimization", "Guides", "sleep-optimization");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
