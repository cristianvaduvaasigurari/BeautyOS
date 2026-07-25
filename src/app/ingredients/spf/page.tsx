import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always spf
export default function StaticPage() {
  const article = editorialContent["ingredients-spf"];

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
