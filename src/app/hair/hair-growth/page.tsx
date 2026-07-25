import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always hair-growth
export default function StaticPage() {
  const article = editorialContent["hair-hair-growth"];

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
