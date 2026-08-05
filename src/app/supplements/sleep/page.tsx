import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function SleepSupplementsPage() {
  const article = getEditorialArticle("supplements-sleep", "Supplements", "sleep");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Library" 
    />
  );
}
