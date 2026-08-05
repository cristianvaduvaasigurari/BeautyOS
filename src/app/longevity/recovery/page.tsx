import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export default function StaticPage() {
  const article = editorialContent["longevity-recovery"];

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
