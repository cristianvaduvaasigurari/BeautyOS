import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always pre-workout
export default function StaticPage() {
  const article = editorialContent["supplements-pre-workout"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Hub" 
    />
  );
}
