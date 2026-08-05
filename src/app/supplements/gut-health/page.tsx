import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function GutHealthSupplementsPage() {
  const article = getEditorialArticle("supplements-gut-health", "Supplements", "gut-health");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Library" 
    />
  );
}
