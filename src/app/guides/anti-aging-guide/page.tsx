import React from "react";
import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export default function StaticPage() {
  const article = editorialContent["guides-anti-aging-guide"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
