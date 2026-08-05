import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function MPSPage() {
  const article = getEditorialArticle("science-muscle-protein-synthesis", "Science", "muscle-protein-synthesis");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
