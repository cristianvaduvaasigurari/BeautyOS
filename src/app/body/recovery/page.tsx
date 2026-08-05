import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function BodyRecoveryPage() {
  const article = getEditorialArticle("body-recovery", "Body", "recovery");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/body" 
      backLabel="Body Hub" 
    />
  );
}
