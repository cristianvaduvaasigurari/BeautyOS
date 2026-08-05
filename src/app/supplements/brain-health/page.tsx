import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function BrainHealthSupplementsPage() {
  const article = getEditorialArticle("supplements-brain-health", "Supplements", "brain-health");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Library" 
    />
  );
}
