import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always calories
export default function StaticPage() {
  const article = editorialContent["nutrition-calories"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/nutrition" 
      backLabel="Nutrition Hub" 
    />
  );
}
