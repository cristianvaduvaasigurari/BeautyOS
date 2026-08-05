import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function FastingLongevityPage() {
  const article = getEditorialArticle("longevity-fasting", "Longevity", "fasting");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/longevity" 
      backLabel="Longevity Hub" 
    />
  );
}
