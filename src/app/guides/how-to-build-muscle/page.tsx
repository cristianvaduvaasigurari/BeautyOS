import React from "react";
import { getEditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";

export default function HowToBuildMusclePage() {
  const article = getEditorialArticle("guides-how-to-build-muscle", "Guides", "how-to-build-muscle");

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
