import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always cellulite
export default function StaticPage() {
  const article = editorialContent["body-cellulite"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/body" 
      backLabel="Body Hub" 
    />
  );
}
