import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function FatLoss90Page() {
  const article = getEditorialArticle("guides-90-day-fat-loss", "Guides", "90-day-fat-loss");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
