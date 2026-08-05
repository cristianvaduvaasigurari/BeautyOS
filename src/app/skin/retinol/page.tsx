import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function RetinolPage() {
  const article = getEditorialArticle("ingredients-retinol", "Skin", "retinol");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/skin" 
      backLabel="Skin Hub" 
    />
  );
}
