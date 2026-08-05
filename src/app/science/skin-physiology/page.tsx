import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function SkinPhysiologyPage() {
  const article = getEditorialArticle("science-skin-physiology", "Science", "skin-physiology");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
