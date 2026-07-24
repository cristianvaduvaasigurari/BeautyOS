import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Ingredients")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function IngredientPage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Ingredients");

  if (!article || article.category !== "Ingredients") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/ingredients" 
      backLabel="Ingredients Database" 
    />
  );
}
