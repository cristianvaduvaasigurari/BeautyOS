import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always pigmentation
export default function StaticPage() {
  const article = editorialContent["skin-pigmentation"];

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
