import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always hyaluronic-acid
export default function StaticPage() {
  const article = editorialContent["ingredients-hyaluronic-acid"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/ingredients" 
      backLabel="Ingredients Hub" 
    />
  );
}
