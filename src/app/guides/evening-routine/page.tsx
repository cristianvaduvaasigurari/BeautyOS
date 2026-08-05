import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function EveningRoutinePage() {
  const article = getEditorialArticle("guides-evening-routine", "Guides", "evening-routine");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
