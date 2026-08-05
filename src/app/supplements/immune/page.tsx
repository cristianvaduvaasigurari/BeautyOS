import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function ImmuneSupplementsPage() {
  const article = getEditorialArticle("supplements-immune", "Supplements", "immune");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Library" 
    />
  );
}
