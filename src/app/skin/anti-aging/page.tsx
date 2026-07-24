import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always anti-aging
export default function StaticPage() {
  const article = editorialContent["skin-anti-aging"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/skin" 
      backLabel="Skin Hub" 
    />
  );
}
