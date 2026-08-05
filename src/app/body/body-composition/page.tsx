import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function BodyCompositionPage() {
  const article = getEditorialArticle("body-body-composition", "Body", "body-composition");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/body" 
      backLabel="Body Hub" 
    />
  );
}
