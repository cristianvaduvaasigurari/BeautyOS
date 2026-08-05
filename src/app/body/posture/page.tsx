import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function PosturePage() {
  const article = getEditorialArticle("body-posture", "Body", "posture");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/body" 
      backLabel="Body Hub" 
    />
  );
}
