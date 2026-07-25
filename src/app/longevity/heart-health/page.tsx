import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always heart-health
export default function StaticPage() {
  const article = editorialContent["longevity-heart-health"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/longevity" 
      backLabel="Longevity Hub" 
    />
  );
}
