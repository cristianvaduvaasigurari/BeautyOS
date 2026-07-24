import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always hiit
export default function StaticPage() {
  const article = editorialContent["fitness-hiit"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/fitness" 
      backLabel="Fitness Hub" 
    />
  );
}
