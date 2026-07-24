import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always collagen
export default function StaticPage() {
  const article = editorialContent["supplements-collagen"];

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
