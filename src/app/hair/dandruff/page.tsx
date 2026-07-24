import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always dandruff
export default function StaticPage() {
  const article = editorialContent["hair-dandruff"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/hair" 
      backLabel="Hair Hub" 
    />
  );
}
