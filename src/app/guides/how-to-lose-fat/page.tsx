import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function HowToLoseFatPage() {
  const article = getEditorialArticle("guides-how-to-lose-fat", "Guides", "how-to-lose-fat");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
